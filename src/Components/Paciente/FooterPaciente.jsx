
function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        <p style={copyrightStyle}>© 2021 Company, Inc</p>
        <div style={iconContainerStyle}>
          <span style={iconStyle}>B</span>
        </div>
        <nav style={navStyle}>
          <a href="#home" style={linkStyle}>Home</a>
          <a href="#features" style={linkStyle}>Features</a>
          <a href="#pricing" style={linkStyle}>Pricing</a>
          <a href="#faqs" style={linkStyle}>FAQs</a>
          <a href="#about" style={linkStyle}>About</a>
        </nav>
      </div>
    </footer>
  );
}

const footerStyle = {
  borderTop: '1px solid #e0e0e0',
  padding: '1em 0',
  textAlign: 'center',
    backgroundColor: '#3c94f2',
};

const footerContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5em',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
};

const copyrightStyle = {
  margin: 0,
};

const iconContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '4px',
  fontSize: '16px',
};

const iconStyle = {
  fontWeight: 'bold',
};

const navStyle = {
  display: 'flex',
  gap: '1em',
};

const linkStyle = {
  color: '#000',
  textDecoration: 'none',
  fontSize: '14px',
};

export default Footer;
