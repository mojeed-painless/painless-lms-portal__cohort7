import '../../assets/styles/loading-animation.css';
import logoTop from '../../assets/logo-top.png';
import logoBottom from '../../assets/logo-bottom.png';

export default function LoadingAnimation() {
    return (
            // <div className="loading-overlay" aria-live="polite" aria-busy="true">
            //   <div className="spinner" role="status" aria-label="Loading">
            //     <div className="ring ring1" />
            //     <div className="ring ring2" />
            //     <div className="ring ring3" />
            //     <div className="dots">
            //       <span></span>
            //       <span></span>
            //       <span></span>
            //       <span></span>
            //     </div>
            //   </div>
            // </div>

            <div className="loading__container">
                <div className="loading__logo">
                    <div className='logo__center'>
                    <div className="logo__top">
                        {/* <img src={logoTop} alt="Top logo" /> */}
                    </div>

                    <div className="logo__bottom">
                        {/* <img src={logoBottom} alt="Bottom logo" /> */}
                    </div>
                    </div>
                </div>
            </div>
    )
}