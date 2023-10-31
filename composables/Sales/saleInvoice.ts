import ISaleForm from '~/interfaces/Sales/ISaleForm'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function getMiddleX(fontSize: number, text: string, pageWidth: number = 0) {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16 // or "smart", default is 16
  });

  const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
  if (pageWidth == 0) {
    pageWidth = doc.internal.pageSize.getWidth();
  }
  return (pageWidth - textWidth) / 2;
}

export function saleInvoice(saleDetail: ISaleForm, saleItems: any) {
  const nuxt = useNuxtApp()

  const columns = ['NO', 'JUMLAH', 'NAMA', 'HARGA', 'DISC', 'SUBTOTAL']

  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16 // or "smart", default is 16
  });

  // Set the initial position for content
  let x = 12;
  let y = 10;
  let fontSize = 11;

  // Add the bill header
  doc
    .setFont('times', 'bold')
    .setFontSize(14)
    .text('NOTA PENJUALAN', x, y);
  y += 8;

  doc.setFont('times', 'normal').setFontSize(fontSize)

  // Add the bill details
  doc.text('No. Faktur', x, y);
  doc.text(':', x + 20, y);
  doc.text(saleDetail.invoice_number, x + 22, y);

  doc.text('Customer', x + 70, y);
  doc.text(':', x + 88, y);
  doc.text(saleDetail.customer_name ?? '-', x + 90, y);
  y += 5.5;

  doc.text('Tanggal', x, y);
  doc.text(':', x + 20, y);
  doc.text(nuxt.$formatDate(saleDetail.created_at), x + 22, y);
  y += 6;

  const rowHeight = 8; // Adjust the row height to match the font size
  // Create the autoTable
  doc.autoTable({
    head: [columns],
    body: saleItems.map((data: any, index: number) => [index + 1, nuxt.$formatThousand(data.quantity) + ' ' + data.unit_name, data.item_name, nuxt.$formatThousand(data.sell_price), data.discount_value == 0 ? 'netto' : nuxt.$formatThousand(data.discount_percentage) + '%', nuxt.$formatThousand(data.total_price)]),
    startY: y, // Y position for the table
    startX: x,
    theme: 'plain',
    styles: {
      lineColor: 'black',
      lineWidth: '0',
      rowHeight: rowHeight,
    },
    headStyles: {
      textColor: 'black',
      halign: 'center',
      valign: 'middle',
      cellPadding: 0,
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'right' },
      1: { cellWidth: 28, halign: 'right' },
      2: { cellWidth: 80, halign: 'left' },
      3: { cellWidth: 23, halign: 'right' },
      4: { cellWidth: 20, halign: 'center' },
      5: { cellWidth: 28, halign: 'right' },
    },
    didDrawCell: (data: any) => {
      const { cell, column, row, settings } = data;
      const lineWidth = 0.5; // Adjust the line width as needed
      if (data.section === 'head') {

        if (data.row.index === 0) {
          // Draw top border for the first row (header)
          doc.setLineWidth(lineWidth);
          doc.line(cell.x, cell.y, cell.x + cell.width, cell.y);
        }

        // Draw bottom border for all rows (header)

        doc.setLineWidth(lineWidth);
        doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
      } else if (data.row.index == saleItems.length-1) {
        doc.setLineWidth(lineWidth);
        doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
      }
    },
  });
  y = doc.lastAutoTable.finalY + 5;

  doc.text('Sales', x + 38, y);
  doc.text(':', x + 50, y);
  doc.text(saleDetail.created_by_name, x + 54, y);

  // Calculate the total
  const total = saleItems.reduce((acc: number, item: any) => acc + parseInt(item.total_price), 0);

  doc.setFontSize(12);
  doc.text('Total', x + 125, y);
  doc.text(':', x + 147, y);
  doc.text(nuxt.$formatThousand(total).toString(), x + 185, y, { align: 'right' });
  y += 5;

  doc.setFontSize(fontSize);
  doc.text('Keterangan', x, y);
  doc.text(':', x + 25, y);
  doc.text('*', x + 30, y);

  // Calculate the discount
  const discount = saleItems.reduce((acc: number, item: any) => acc + parseInt(item.discount_value), 0);

  doc.setFontSize(12);
  doc.text('Discount', x + 125, y);
  doc.text(':', x + 147, y);
  doc.text(nuxt.$formatThousand(discount).toString(), x + 185, y, { align: 'right' });
  y += 5;

  doc.text('Grand Total', x + 125, y);
  doc.text(':', x + 147, y);
  doc.text(nuxt.$formatThousand(total).toString(), x + 185, y, { align: 'right' });
  y += 12,

  doc.setFontSize(fontSize);

  doc.text('Penerima', x + 20, y);

  // doc.text('Mohon Ditransfer Ke', getMiddleX(fontSize, 'Mohon Ditransfer Ke'), y);

  doc.text('Hormat Kami', x + 135, y);
  y += 5;

  // doc.text('BCA Cab Pucang Anom Surabaya', getMiddleX(fontSize, 'BCA Cab Pucang Anom Surabaya'), y);
  y += 5;

  // doc.text('A N : Ponix Harunu', getMiddleX(fontSize, 'A N : Ponix Harunu'), y);
  y += 5;

  // doc.text('A C : 02342353412', getMiddleX(fontSize, 'A C : 02342353412'), y);
  y += 1;

  doc.setLineWidth(0.3).line(x + 10, y + 1, x + 45, y + 1);
  doc.setLineWidth(0.3).line(x + 127, y + 1, x + 165, y + 1);

  // Save the PDF
  doc.save('sale.pdf');
}