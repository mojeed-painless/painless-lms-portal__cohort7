import { useState } from 'react';
import '../../assets/styles/code-box.css';

export default function CodeBox({ lang, outputImg, children }) {
    
    const [ showOutput, setShowOutput ] = useState(true);
    
    return (
        <article>
            <div className="example example-code">
                <div className="code-header">
                    <div>{lang} code</div>
                    <button onClick={() => setShowOutput(so => !so)} className="run-btn">Run code</button>
                </div>

                <div className="code-content">
                    {children}
                </div>
            </div>

            <div className={`example hide-output ${(!showOutput) ? 'active-output' : ''}`}>
                <div className="output-header">
                    <div>Output</div>
                </div>

                <div className="output-content">
                    <img src={outputImg} alt="" />
                </div>
            </div>
        </article>
    )
}