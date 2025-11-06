const CardHologramPage = () => {
  // Estilos CSS como string para incluir las animaciones
  const styles = `
    @keyframes float1 {
      0%, 100% {
        transform: translateY(10px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes float2 {
      0%, 100% {
        transform: translateY(-10px);
      }
      50% {
        transform: translateY(10px);
      }
    }
    
    .floating-element-1 {
      animation: float1 3s ease-in-out infinite;
    }
    
    .floating-element-2 {
      animation: float2 3s ease-in-out infinite 1.5s;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div style={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: 'Consolas, monospace',
        width: '100%',
        minHeight: '100vh',
        background: '#1d061a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '40px 20px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          
          {/* Card 1 */}
          <div 
            className="hologram-box"
            style={{
              position: 'relative',
              width: '320px',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '40px 30px',
              transition: '0.5s'
            }}
            onMouseEnter={(e) => {
              const box = e.currentTarget;
              const before = box.querySelector('.before-element') as HTMLElement | null;
              const after = box.querySelector('.after-element') as HTMLElement | null;
              const content = box.querySelector('.content') as HTMLElement | null;
              const spanBefore = box.querySelector('.span-before') as HTMLElement | null;
              const spanAfter = box.querySelector('.span-after') as HTMLElement | null;
              
              if (before && after) {
                before.style.transform = 'skewX(0deg)';
                before.style.left = '20px';
                before.style.width = 'calc(100% - 90px)';
                after.style.transform = 'skewX(0deg)';
                after.style.left = '20px';
                after.style.width = 'calc(100% - 90px)';
              }
              
              if (content) {
                content.style.left = '-25px';
                content.style.padding = '60px 40px';
              }
              
              if (spanBefore) {
                spanBefore.style.top = '-50px';
                spanBefore.style.left = '50px';
                spanBefore.style.width = '100px';
                spanBefore.style.height = '100px';
                spanBefore.style.opacity = '1';
              }
              
              if (spanAfter) {
                spanAfter.style.bottom = '-50px';
                spanAfter.style.right = '50px';
                spanAfter.style.width = '100px';
                spanAfter.style.height = '100px';
                spanAfter.style.opacity = '1';
              }
            }}
            onMouseLeave={(e) => {
              const box = e.currentTarget;
              const before = box.querySelector('.before-element') as HTMLElement | null;
              const after = box.querySelector('.after-element') as HTMLElement | null;
              const content = box.querySelector('.content') as HTMLElement | null;
              const spanBefore = box.querySelector('.span-before') as HTMLElement | null;
              const spanAfter = box.querySelector('.span-after') as HTMLElement | null;
              
              if (before && after) {
                before.style.transform = 'skewX(15deg)';
                before.style.left = '50px';
                before.style.width = '50%';
                after.style.transform = 'skewX(15deg)';
                after.style.left = '50px';
                after.style.width = '50%';
              }
              
              if (content) {
                content.style.left = '0';
                content.style.padding = '20px 40px';
              }
              
              if (spanBefore) {
                spanBefore.style.top = '0';
                spanBefore.style.left = '0';
                spanBefore.style.width = '0';
                spanBefore.style.height = '0';
                spanBefore.style.opacity = '0';
              }
              
              if (spanAfter) {
                spanAfter.style.bottom = '0';
                spanAfter.style.right = '0';
                spanAfter.style.width = '0';
                spanAfter.style.height = '0';
                spanAfter.style.opacity = '0';
              }
            }}
          >
            {/* Before pseudo-element */}
            <div 
              className="before-element"
              style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: '50px',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(315deg, #ffbc00, #ff0058)',
                borderRadius: '8px',
                transform: 'skewX(15deg)',
                transition: '0.5s'
              }}
            />
            
            {/* After pseudo-element (blur effect) */}
            <div 
              className="after-element"
              style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: '50px',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(315deg, #ffbc00, #ff0058)',
                borderRadius: '8px',
                transform: 'skewX(15deg)',
                transition: '0.5s',
                filter: 'blur(30px)'
              }}
            />
            
            {/* Animated spans */}
            <span style={{
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 5,
              pointerEvents: 'none'
            }}>
              <div 
                className="span-before floating-element-1"
                style={{
                  content: '',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  transition: '0.1s',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}
              />
              <div 
                className="span-after floating-element-2"
                style={{
                  content: '',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '0',
                  height: '0',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  transition: '0.5s',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}
              />
            </span>
            
            <div 
              className="content"
              style={{
                position: 'relative',
                left: 0,
                padding: '20px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                zIndex: 1,
                transition: '0.5s',
                color: '#fff'
              }}
            >
              <h2 style={{
                fontSize: '2em',
                color: '#fff',
                marginBottom: '10px'
              }}>Card One</h2>
              <p style={{
                fontSize: '1.1em',
                marginBottom: '10px',
                lineHeight: '1.4em'
              }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a 
                href="#"
                style={{
                  display: 'inline-block',
                  fontSize: '1.1em',
                  color: '#111',
                  background: '#fff',
                  padding: '10px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  marginTop: '5px',
                  transition: '0.3s'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = '#ffcf4d';
                  target.style.border = '1px solid rgba(255, 0, 88, 0.4)';
                  target.style.boxShadow = '0 1px 15px rgba(1, 1, 1, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = '#fff';
                  target.style.border = 'none';
                  target.style.boxShadow = 'none';
                }}
              >Read More</a>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className="hologram-box"
            style={{
              position: 'relative',
              width: '320px',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '40px 30px',
              transition: '0.5s'
            }}
            onMouseEnter={(e) => {
              const box = e.currentTarget;
              const before = box.querySelector('.before-element') as HTMLElement | null;
              const after = box.querySelector('.after-element') as HTMLElement | null;
              const content = box.querySelector('.content') as HTMLElement | null;
              const spanBefore = box.querySelector('.span-before') as HTMLElement | null;
              const spanAfter = box.querySelector('.span-after') as HTMLElement | null;
              
              if (before && after) {
                before.style.transform = 'skewX(0deg)';
                before.style.left = '20px';
                before.style.width = 'calc(100% - 90px)';
                after.style.transform = 'skewX(0deg)';
                after.style.left = '20px';
                after.style.width = 'calc(100% - 90px)';
              }
              
              if (content) {
                content.style.left = '-25px';
                content.style.padding = '60px 40px';
              }
              
              if (spanBefore) {
                spanBefore.style.top = '-50px';
                spanBefore.style.left = '50px';
                spanBefore.style.width = '100px';
                spanBefore.style.height = '100px';
                spanBefore.style.opacity = '1';
              }
              
              if (spanAfter) {
                spanAfter.style.bottom = '-50px';
                spanAfter.style.right = '50px';
                spanAfter.style.width = '100px';
                spanAfter.style.height = '100px';
                spanAfter.style.opacity = '1';
              }
            }}
            onMouseLeave={(e) => {
              const box = e.currentTarget;
              const before = box.querySelector('.before-element') as HTMLElement | null;
              const after = box.querySelector('.after-element') as HTMLElement | null;
              const content = box.querySelector('.content') as HTMLElement | null;
              const spanBefore = box.querySelector('.span-before') as HTMLElement | null;
              const spanAfter = box.querySelector('.span-after') as HTMLElement | null;
              
              if (before && after) {
                before.style.transform = 'skewX(15deg)';
                before.style.left = '50px';
                before.style.width = '50%';
                after.style.transform = 'skewX(15deg)';
                after.style.left = '50px';
                after.style.width = '50%';
              }
              
              if (content) {
                content.style.left = '0';
                content.style.padding = '20px 40px';
              }
              
              if (spanBefore) {
                spanBefore.style.top = '0';
                spanBefore.style.left = '0';
                spanBefore.style.width = '0';
                spanBefore.style.height = '0';
                spanBefore.style.opacity = '0';
              }
              
              if (spanAfter) {
                spanAfter.style.bottom = '0';
                spanAfter.style.right = '0';
                spanAfter.style.width = '0';
                spanAfter.style.height = '0';
                spanAfter.style.opacity = '0';
              }
            }}
          >
            {/* Before pseudo-element */}
            <div 
              className="before-element"
              style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: '50px',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(315deg, #03a9f4, #ff0058)',
                borderRadius: '8px',
                transform: 'skewX(15deg)',
                transition: '0.5s'
              }}
            />
            
            {/* After pseudo-element (blur effect) */}
            <div 
              className="after-element"
              style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: '50px',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(315deg, #03a9f4, #ff0058)',
                borderRadius: '8px',
                transform: 'skewX(15deg)',
                transition: '0.5s',
                filter: 'blur(30px)'
              }}
            />
            
            {/* Animated spans */}
            <span style={{
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 5,
              pointerEvents: 'none'
            }}>
              <div 
                className="span-before floating-element-1"
                style={{
                  content: '',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  transition: '0.1s',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}
              />
              <div 
                className="span-after floating-element-2"
                style={{
                  content: '',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '0',
                  height: '0',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  transition: '0.5s',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}
              />
            </span>
            
            <div 
              className="content"
              style={{
                position: 'relative',
                left: 0,
                padding: '20px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                zIndex: 1,
                transition: '0.5s',
                color: '#fff'
              }}
            >
              <h2 style={{
                fontSize: '2em',
                color: '#fff',
                marginBottom: '10px'
              }}>Card Two</h2>
              <p style={{
                fontSize: '1.1em',
                marginBottom: '10px',
                lineHeight: '1.4em'
              }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a 
                href="#"
                style={{
                  display: 'inline-block',
                  fontSize: '1.1em',
                  color: '#111',
                  background: '#fff',
                  padding: '10px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  marginTop: '5px',
                  transition: '0.3s'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = '#ffcf4d';
                  target.style.border = '1px solid rgba(255, 0, 88, 0.4)';
                  target.style.boxShadow = '0 1px 15px rgba(1, 1, 1, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = '#fff';
                  target.style.border = 'none';
                  target.style.boxShadow = 'none';
                }}
              >Read More</a>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            className="hologram-box"
            style={{
              position: 'relative',
              width: '320px',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '40px 30px',
              transition: '0.5s'
            }}
            onMouseEnter={(e) => {
              const box = e.currentTarget;
              const before = box.querySelector('.before-element') as HTMLElement | null;
              const after = box.querySelector('.after-element') as HTMLElement | null;
              const content = box.querySelector('.content') as HTMLElement | null;
              const spanBefore = box.querySelector('.span-before') as HTMLElement | null;
              const spanAfter = box.querySelector('.span-after') as HTMLElement | null;
              
              if (before && after) {
                before.style.transform = 'skewX(0deg)';
                before.style.left = '20px';
                before.style.width = 'calc(100% - 90px)';
                after.style.transform = 'skewX(0deg)';
                after.style.left = '20px';
                after.style.width = 'calc(100% - 90px)';
              }
              
              if (content) {
                content.style.left = '-25px';
                content.style.padding = '60px 40px';
              }
              
              if (spanBefore) {
                spanBefore.style.top = '-50px';
                spanBefore.style.left = '50px';
                spanBefore.style.width = '100px';
                spanBefore.style.height = '100px';
                spanBefore.style.opacity = '1';
              }
              
              if (spanAfter) {
                spanAfter.style.bottom = '-50px';
                spanAfter.style.right = '50px';
                spanAfter.style.width = '100px';
                spanAfter.style.height = '100px';
                spanAfter.style.opacity = '1';
              }
            }}
            onMouseLeave={(e) => {
              const box = e.currentTarget;
              const before = box.querySelector('.before-element') as HTMLElement | null;
              const after = box.querySelector('.after-element') as HTMLElement | null;
              const content = box.querySelector('.content') as HTMLElement | null;
              const spanBefore = box.querySelector('.span-before') as HTMLElement | null;
              const spanAfter = box.querySelector('.span-after') as HTMLElement | null;
              
              if (before && after) {
                before.style.transform = 'skewX(15deg)';
                before.style.left = '50px';
                before.style.width = '50%';
                after.style.transform = 'skewX(15deg)';
                after.style.left = '50px';
                after.style.width = '50%';
              }
              
              if (content) {
                content.style.left = '0';
                content.style.padding = '20px 40px';
              }
              
              if (spanBefore) {
                spanBefore.style.top = '0';
                spanBefore.style.left = '0';
                spanBefore.style.width = '0';
                spanBefore.style.height = '0';
                spanBefore.style.opacity = '0';
              }
              
              if (spanAfter) {
                spanAfter.style.bottom = '0';
                spanAfter.style.right = '0';
                spanAfter.style.width = '0';
                spanAfter.style.height = '0';
                spanAfter.style.opacity = '0';
              }
            }}
          >
            {/* Before pseudo-element */}
            <div 
              className="before-element"
              style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: '50px',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(315deg, #4dff03, #00d0ff)',
                borderRadius: '8px',
                transform: 'skewX(15deg)',
                transition: '0.5s'
              }}
            />
            
            {/* After pseudo-element (blur effect) */}
            <div 
              className="after-element"
              style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: '50px',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(315deg, #4dff03, #00d0ff)',
                borderRadius: '8px',
                transform: 'skewX(15deg)',
                transition: '0.5s',
                filter: 'blur(30px)'
              }}
            />
            
            {/* Animated spans */}
            <span style={{
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 5,
              pointerEvents: 'none'
            }}>
              <div 
                className="span-before floating-element-1"
                style={{
                  content: '',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  transition: '0.1s',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}
              />
              <div 
                className="span-after floating-element-2"
                style={{
                  content: '',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '0',
                  height: '0',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  transition: '0.5s',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}
              />
            </span>
            
            <div 
              className="content"
              style={{
                position: 'relative',
                left: 0,
                padding: '20px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                zIndex: 1,
                transition: '0.5s',
                color: '#fff'
              }}
            >
              <h2 style={{
                fontSize: '2em',
                color: '#fff',
                marginBottom: '10px'
              }}>Card Three</h2>
              <p style={{
                fontSize: '1.1em',
                marginBottom: '10px',
                lineHeight: '1.4em'
              }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a 
                href="#"
                style={{
                  display: 'inline-block',
                  fontSize: '1.1em',
                  color: '#111',
                  background: '#fff',
                  padding: '10px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  marginTop: '5px',
                  transition: '0.3s'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = '#ffcf4d';
                  target.style.border = '1px solid rgba(255, 0, 88, 0.4)';
                  target.style.boxShadow = '0 1px 15px rgba(1, 1, 1, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = '#fff';
                  target.style.border = 'none';
                  target.style.boxShadow = 'none';
                }}
              >Read More</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHologramPage;