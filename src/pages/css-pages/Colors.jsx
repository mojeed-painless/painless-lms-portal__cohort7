import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Colors() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Colors</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            CSS allows you to apply color to text, backgrounds, borders, and many other elements on a webpage.
                            Colors can be specified using predefined names (like <code className="code">green</code>, <code className="code">orange</code>, <code className="code">wine</code>) or using numeric systems like RGB, HEX, HSL, RGBA, and HSLA.
                        </p>

                        <h3>RGB Colors</h3>
                        <p>
                            RGB stands for <strong>Red</strong>, <strong>Green</strong>, and <strong>Blue</strong>.
                            The values range from 0 to 255 for each color.
                        </p>
<ExampleCode> 
{`rgb(red, green, blue)

 rgb(255, 192, 203)`}
</ExampleCode>

                        <p>This gives a pink color by mixing full red (255), moderate green (192), and light blue (203).</p>

                        <h3> RGBA Colors</h3>
                        <p>
                            RGBA is an extension of RGB that includes an <strong>Alpha</strong> value, which controls transparency.
                            The alpha value ranges from 0.0 (completely transparent) to 1.0 (fully opaque).
                        </p>
<ExampleCode> 
{`rgb(red, green, blue, alpha)

 rgba(255, 192, 203, 0.3)`}
</ExampleCode>

                        <p>This gives a pink color with 30% opacity.</p>

                        <h3> HEX Colors</h3>
                        <p>
                            HEX stands for hexadecimal and uses base-16 values to represent colors.
                            The format is <code className="code">#rrggbb</code>, where:
                            <ul>
                            <li><strong>rr</strong> = red</li>
                            <li><strong>gg</strong> = green</li>
                            <li><strong>bb</strong> = blue</li>
                            </ul>
                        </p>
                        <pre><code className="code">#FFC0CB</code></pre>
                        <p>This also gives a pink color, just like the RGB example above.</p>
                        
                        <h3> HSL Colors</h3>
                        <p>
                            HSL stands for <strong>Hue</strong>, <strong>Saturation</strong>, and <strong>Lightness</strong>.
                            The hue is represented as a degree on the color wheel (0-360), saturation is a percentage (0% to 100%), and lightness is also a percentage (0% to 100%).
                        </p>
<ExampleCode> 
{`hsl(350, 100%, 88%)`}
</ExampleCode>
                        <p>This gives a light pink color with full saturation and lightness.</p>


                        <h3>Conclusion</h3>
                        <p>
                            Mastering color formats like RGB, RGBA, and HEX gives you the flexibility to apply precise visual styles to your web designs.
                        </p>
                        <p>
                            Understanding how to control color opacity, contrast, and blending allows you to create more vibrant, accessible, and user-friendly interfaces.
                        </p>
                        <h3 className="bold">
                            As we move forward, you’ll start combining colors with other CSS properties to create complete designs.
                        </h3>

    <VideoBox 
        title='Colors'
        code='QmGJaZFra00?si=NU5MasD2pZPJh726'
    />    



                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_selectors" 
                nextPath="/css_background"
            />
        </section>
    );
}
