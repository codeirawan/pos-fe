import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ISale from '~/interfaces/Sales/ISale'
import ISaleFormItem from '~/interfaces/Sales/ISaleFormItem'


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

export function deliveryOrderInvoice(saleItems: ISaleFormItem[], sale: ISale, store: any) {
  const nuxt = useNuxtApp()
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16 // or "smart", default is 16
  });

  // Set the initial position for content
  let xz = 118;
  let x = 15;
  let y = 10;
  let fontSize = 11;

  // Add header
  doc
    .setFont('times', 'bold')
    .setFontSize(13)
    .text(store.name, getMiddleX(13, store.name, 110), y);
  y += 5.5;

  doc.setFont('times', 'normal').setFontSize(fontSize)
  doc.text(store.address, getMiddleX(fontSize, store.address, 112), y);
  y += 5.5;

  doc.text('Wa. ' + (store.sale_lower_price_whatsapp_number ?? '-'), getMiddleX(fontSize, 'Wa. ' + (store.sale_lower_price_whatsapp_number ?? '-'), 110), y);

  y -= 3;
  doc
    .setFont('times', 'bold')
    .setFontSize(20)
    .text('SURAT JALAN', xz + 17, y);
  y += 8.5;

  doc.rect(x, y - 1, 100, 31, 'S');
  y += 4;
  doc.setFont('times', 'normal').setFontSize(13)
  doc.text('Kepada :', x + 2, y);

  y -= 2;
  // Add detail
  doc.setFont('times', 'normal').setFontSize(fontSize)
  doc.text('Nomor Surat Jalan', xz, y);
  doc.text(':', xz + 32, y);
  doc.text(sale.invoice_number, xz + 35, y);
  doc.setLineWidth(0.3).line(xz + 35, y + 1, xz + 80, y + 1);
  y += 7;

  doc.text('Tanggal', xz, y);
  doc.text(':', xz + 32, y);
  doc.text(nuxt.$formatDate(sale.created_at), xz + 35, y);
  doc.setLineWidth(0.3).line(xz + 35, y + 1, xz + 80, y + 1);
  y += 7;

  doc.text('No. Polisi', xz, y);
  doc.text(':', xz + 32, y);
  doc.text(sale.police_number, xz + 35, y);
  doc.setLineWidth(0.3).line(xz + 35, y + 1, xz + 80, y + 1);
  y += 20;

  // Calculate the full width based on available page width
  const fullWidth = doc.internal.pageSize.getWidth() - 2 * x;
  let namaBarangWidth = fullWidth

  // Define table header columns with two rows
  let tableHeader = [
    { label: 'No', width: 10 },
    { label: 'Kode Barang', width: 26 },
    { label: 'Nama Barang', width: 40 },
    { label: 'Satuan', width: 18 },
    { label: 'Jumlah Packing', width: 23, rowspan: 2 },
    { label: 'Jumlah Barang', width: 23, rowspan: 2 },
    { label: 'Keterangan', width: 25 },
  ];

  tableHeader.forEach(column => {
    if (column.label != 'Nama Barang') {
      namaBarangWidth -= column.width;
    }
  });
  tableHeader[2].width = namaBarangWidth

  const rowHeight = 12; // Adjust the row height to match the font size

  doc.autoTable({
    head: [tableHeader.map(header => header.label)],
    body: saleItems.map((data: any, index: number) => [index+1, data.item_code, data.item_name, data.unit_name, data.price_category_name, nuxt.$formatThousand(data.quantity), data.warehouse_name]),
    startY: y,
    startX: x,
    theme: 'grid',
    tableWidth: 'auto',
    styles: {
      lineColor: 'black',
      lineWidth: '0.5',
      rowHeight: rowHeight,
    },
    headStyles: {
      textColor: 'black',
      halign: 'center',
      valign: 'middle',
    },
    bodyStyles: {
      halign: 'center',
      valign: 'middle',
    },
    columnStyles: {
      0: { cellWidth: tableHeader[0].width },
      1: { cellWidth: tableHeader[1].width },
      2: { cellWidth: tableHeader[2].width + 3 },
      3: { cellWidth: tableHeader[3].width },
      4: { cellWidth: tableHeader[4].width },
      5: { cellWidth: tableHeader[5].width },
      6: { cellWidth: tableHeader[6].width },
    },
    didDrawCell: (data: any) => {
      // Draw cell borders
      const { table } = data;
      const { styles } = table;

      if (data.row.index === 0) {
        if (data.section === 'head') {
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
        }
      }
      if (data.row.index === 1 && data.section === 'head') {
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height + styles.rowHeight[1], 'S');
      }
      if (data.section === 'body') {
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
      }
    },
  });

  y = doc.lastAutoTable.finalY + 5;

  // Create the table data
  const tableSignature1 = [
    {
      signature: ' (                                   )', // Add your table data here
    },
    // Add more data if needed
  ];

  // Create the table data
  const tableSignature = [
    {
      signature: ' (                      )      ', // Add your table data here
    },
    // Add more data if needed
  ];

  // Create the autoTable
  doc.autoTable({
    head: [['Tanda Terima']],
    body: tableSignature1.map(data => [data.signature]),
    startY: y, // Y position for the table
    margin: { left: x },
    styles: {
      lineColor: 'black',
      lineWidth: '0.5',
    },
    headStyles: {
      textColor: 'black',
      halign: 'center',
      valign: 'middle',
    },
    bodyStyles: {
      halign: 'center',
      valign: 'bottom',
      rowHeight: '30',
    },
    columnStyles: {
      0: { cellWidth: 50 }, // Adjust the cell width for the "Signature" column
    },
  });

  // Create the autoTable
  doc.autoTable({
    head: [['Sopir']],
    body: tableSignature.map(data => [data.signature]),
    startY: y, // Y position for the table
    margin: { left: x + 93 },
    styles: {
      lineColor: 'black',
      lineWidth: '0.5',
    },
    headStyles: {
      textColor: 'black',
      halign: 'center',
      valign: 'middle',
    },
    bodyStyles: {
      halign: 'center',
      valign: 'bottom',
      rowHeight: '30',
    },
    columnStyles: {
      0: { cellWidth: 30 }, // Adjust the cell width for the "Signature" column
    },
    didDrawCell: (data: any) => {
      // Draw cell borders
      const { table } = data;
      const { styles } = table;

      if (data.row.index === 0) {
        if (data.section === 'head') {
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
        }
      }
      if (data.row.index === 1 && data.section === 'head') {
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height + styles.rowHeight[1], 'S');
      }
      if (data.section === 'body') {
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
      }
    },
  });

  // Create the autoTable
  doc.autoTable({
    head: [['Manager']],
    body: tableSignature.map(data => [data.signature]),
    startY: y, // Y position for the table
    margin: { left: x + 123 },
    styles: {
      lineColor: 'black',
      lineWidth: '0.5',
    },
    headStyles: {
      textColor: 'black',
      halign: 'center',
      valign: 'middle',
    },
    bodyStyles: {
      halign: 'center',
      valign: 'bottom',
      rowHeight: '30',
    },
    columnStyles: {
      0: { cellWidth: 30 }, // Adjust the cell width for the "Signature" column
    },
    didDrawCell: (data: any) => {
      // Draw cell borders
      const { table } = data;
      const { styles } = table;

      if (data.row.index === 0) {
        if (data.section === 'head') {
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
        }
      }
      if (data.row.index === 1 && data.section === 'head') {
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height + styles.rowHeight[1], 'S');
      }
      if (data.section === 'body') {
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
      }
    },
  });

  // Create the autoTable
  doc.autoTable({
    head: [['Bag. Packing']],
    body: tableSignature.map(data => [data.signature]),
    startY: y, // Y position for the table
    margin: { left: x + 153 },
    styles: {
      lineColor: 'black',
      lineWidth: '0.5',
    },
    headStyles: {
      textColor: 'black',
      halign: 'center',
      valign: 'middle',
    },
    bodyStyles: {
      halign: 'center',
      valign: 'bottom',
      rowHeight: '30',
    },
    columnStyles: {
      0: { cellWidth: 30 }, // Adjust the cell width for the "Signature" column
    },
    didDrawCell: (data: any) => {
      // Draw cell borders
      const { table } = data;
      const { styles } = table;

      if (data.row.index === 0) {
        if (data.section === 'head') {
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
        }
      }
      if (data.row.index === 1 && data.section === 'head') {
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height + styles.rowHeight[1], 'S');
      }
      if (data.section === 'body') {
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
      }
    },
  });

  // Save the PDF
  doc.save('surat_jalan.pdf');

}