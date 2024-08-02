from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import requests
import os
import uuid
import io
from fastapi.responses import StreamingResponse

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows requests from your React app
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Query(BaseModel):
    prompt: str
    model_name: str
    max_length: int = 200

class AudioQuery(BaseModel):
    text: str
    id: str

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model(model_name=None):

    # model_paths = {
    #     "models--lbjPT2-kgp": 'C:/repos/llm/models/models--lbjPT2-kgp',
    #     "models--lbjPT3-kgp": 'C:/repos/llm/models/models--lbjPT3-kgp'
    # }

    model_paths = {
        "models--lbjPT2-kgp": '/home/bitnami/eras/backend/models/models--lbjPT2-kgp',
        "models--lbjPT3-kgp": '/home/bitnami/eras/backend/models/models--lbjPT3-kgp'
    }
    
    model_path = model_paths.get(model_name)
    print(model_path)
    
    if model_path is None:
        raise ValueError(f"Model {model_name} not found.")
    
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(model_path)

    if model_path == '/home/bitnami/eras/backend/models/models--lbjPT2-kgp':
        tokenizer = GPT2Tokenizer.from_pretrained(model_path)
        model = GPT2LMHeadModel.from_pretrained(model_path)

    model.to(device)
    model.eval()
    return model, tokenizer

def generate_text(prompt, model, tokenizer, max_length=100):
    inputs = tokenizer.encode(prompt, return_tensors='pt').to(device)
    outputs = model.generate(
        inputs, 
        do_sample=True,
        max_length=max_length, 
        num_return_sequences=1, 
        no_repeat_ngram_size=2, 
        early_stopping=True,
        pad_token_id=model.config.eos_token_id,
        top_k=50,
        top_p=0.95,
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)[len(prompt):].strip()

@app.post("/generate")
async def generate_text_endpoint(query: Query):
    model, tokenizer = load_model(query.model_name)
    response = generate_text(query.prompt, model, tokenizer, query.max_length)
    print(response)
    # in response, can you check for any incomplete sentences at the end and delete the sentence so it at least ends with a period
    if response[-1] != ".":
        response = response[:response.rfind(".")+1]
    return {"response": response}

@app.post("/generate_audio")
async def generate_audio_endpoint(audio_query: AudioQuery):
    ELEVENLABS_API_KEY = "sk_7de5f110a0e94d927714ef3f6e91491f4b9402d5d9827107"  
    # ELEVENLABS_VOICE_ID = audio_query.id
    ELEVENLABS_API_URL = f'https://api.elevenlabs.io/v1/text-to-speech/{audio_query.id}'
    
    headers = {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(
        ELEVENLABS_API_URL,
        headers=headers,
        json={"text": audio_query.text}
    )

    if response.status_code == 200:
        audio_data = response.content
        return StreamingResponse(io.BytesIO(audio_data), media_type="audio/mpeg")
    else:
        print(f"Error response: {response.text}")
        raise HTTPException(status_code=500, detail="Error from ElevenLabs API")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
