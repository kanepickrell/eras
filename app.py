from flask import Flask, request, jsonify, send_file, render_template
import requests
import io

app = Flask(__name__, static_url_path='', static_folder='.', template_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/speak', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get('text', '')
    api_key = "sk_7de5f110a0e94d927714ef3f6e91491f4b9402d5d9827107"
    voice_id = "lTI0koW55h9kYCaiTPGY"

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": f"{api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "text": text,
        "voice_settings": {
            "stability": 0.75,
            "similarity_boost": 0.75
        }
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        audio_data = response.content
        return send_file(
            io.BytesIO(audio_data),
            mimetype='audio/mpeg',
            as_attachment=False,
            download_name='output.mp3'
        )
    else:
        return jsonify({"error": response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
