import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function createPDF() {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
  
    // Add a page to the document
    const page = pdfDoc.addPage();
  
    // Set the font and font size
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.setFont(helveticaFont);
    page.setFontSize(24);
  
    // Set the text color
    page.setFontColor(rgb(0, 0.53, 0.71));
  
    // Add some text to the page
    page.drawText('Hello, PDF!', { x: 50, y: 500 });
  
    // Save the PDF document to a buffer
    const pdfBytes = await pdfDoc.save();
  
    // Do something with the PDF bytes (e.g., save to a file)
    // ...
  }
  createPDF()
  .then(() => console.log('PDF created successfully.'))
  .catch((error) => console.log('Error creating PDF:', error));