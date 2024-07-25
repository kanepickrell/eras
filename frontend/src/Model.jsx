import React from "react";
import './modelsStyle.css';

function Model() {
return (
    <div className="models-page">
        <header className="models-header">
            <h1>Understanding Attention Models</h1>
        </header>
        <main>
            <section className="models-intro">
                <h2>what llms i used</h2>
                <p>language models are evolving at lightning speeds, so i admit that the models i am finetuning are outdated
                    by 2024 standards. my goal is not to use the latest and greatest, but learn to use all the tools organically
                    to create something practical. In my case, to rethink how we engage with the past.<br /> On this site, my models
                    have been finetuned with GPT2 and my next iterations will focus on more dialogue centric models like DialoGPT.
                </p>
            </section>

            <section className="models-mechanics">
                <h2>understanding attention and how language models learn context</h2>
                
            </section>

            <section className="models-data">
                <h2>types of data i used and bringing models to life</h2>
                
            </section>

            <section className="process">
                <h2>Finetuning GPTs: a living document</h2>
                <div className="process-steps">
                <div className="step">
                    <h3>Step 1: Aggregating data</h3>
                    <p>First i gathered speeched, writings, letters, and interview transcripts.</p>
                </div>

                <div className="step">
                    <h3>Step 2: Data cleaning</h3>
                    <p>First i gathered speeched, writings, letters, and interview transcripts.</p>
                </div>

                <div className="step">
                    <h3>Step 1: Model selection</h3>
                    <p>First i gathered speeched, writings, letters, and interview transcripts.</p>
                </div>

                <div className="step">
                    <h3>Step 1: testing and evaluation</h3>
                    <p>First i gathered speeched, writings, letters, and interview transcripts.</p>
                </div>

                </div>

                
            </section>

        </main>
        <footer className="models-footer">
            <p>erasXchange is currently under construction.<br />For my other work please see my site below.</p>
            <a href="https://www.kanepickrel.com" target="_blank" rel="noopener noreferrer">Visit my site</a>
        </footer>
    </div>
)
}

export default Model;