const createTemplate = (subject: string, mail: string, message: string) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              max-width: 620px; 
              margin: auto; 
              border-radius: 10px; 
              overflow: hidden; 
              border: 1px solid #e0e0e0;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1f3b73, #315ea8); 
                color: #ffffff; 
                padding: 25px; 
                text-align: center;">
      <h1 style="margin: 0; font-size: 26px; letter-spacing: 1px;">Ascacibar Propiedades</h1>
      <p style="margin-top: 8px; font-size: 14px; opacity: .9;">Conectando personas con hogares</p>
    </div>

    <!-- Body -->
    <div style="padding: 25px; background: #fafafa; color: #444;">
      <h2 style="font-size: 20px; margin-top: 0; color:#1f3b73;">Nuevo mensaje de contacto</h2>

      <div style="margin-bottom: 15px;">
        <strong style="color:#315ea8;">Correo Electrónico:</strong>
        <p style="margin: 5px 0 15px 0;">${mail}</p>

        <strong style="color:#315ea8;">Asunto:</strong>
        <p style="margin: 5px 0 15px 0;">${subject}</p>

        <strong style="color:#315ea8;">Mensaje:</strong>
        <div style="background:#ffffff; 
                    padding:15px; 
                    border-left:4px solid #315ea8; 
                    border-radius:6px; 
                    margin-top:8px; 
                    white-space:pre-line;">
          ${message}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#1f3b73; 
                color:#e4e7f0; 
                text-align:center; 
                padding:15px; 
                font-size:12px;">
      <p style="margin:0;">Este mensaje fue enviado desde <strong>Ascacibar Propiedades</strong>.</p>
      <p style="margin:5px 0 0 0;">&copy; ${new Date().getFullYear()} Ascacibar Propiedades. Todos los derechos reservados.</p>
    </div>

  </div>
  `;
};

export { createTemplate };
