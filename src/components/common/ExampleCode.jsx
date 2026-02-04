import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-markup';

export default function ExampleCode({ children }) {

        useEffect(() => {
          Prism.highlightAll();
        }, []);

    return (
        <pre><code className="language-html">{children}</code></pre>
    )
}