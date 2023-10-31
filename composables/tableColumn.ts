export function useTableColumn() {
  const nuxt = useNuxtApp()

  const actionColumn =
    { name: 'actions', label: nuxt.$getTranslation(`shared.columns.action`), field: '', align: 'center' }

  const actionSelectColumn =
    { name: 'select', label: nuxt.$getTranslation(`shared.buttons.add`), field: '', align: 'center' }

  function actionButtonCustomColumn(label: string) {
    return { name: 'custom-button', label, field: '', align: 'center' }
  }

  const formatPrice = (val: number) => `${nuxt.$formatPrice(val)}`
  const formatBoolean = (val: number) => `${nuxt.$formatBoolean(val)}`
  const formatDate = (val: number) => `${nuxt.$formatDate(val)}`

  // Columns Explaination
  // - name: Match colum name on table's database. Example: name (Direct Table), items.name (Relation Table)
  // - field: Match JSON response from API. Example: item_name

  const columns = {
    usersTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      { name: 'phone', align: 'left', label: nuxt.$getTranslation(`shared.columns.phone`), field: 'phone', sortable: true },
      actionColumn
    ],
    rolesTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    itemDeliveriesTable: [
      { name: 'invoice_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceNumber`), field: 'invoice_number', sortable: true },
      { name: 'created_at', align: 'left', label: nuxt.$getTranslation(`shared.columns.date`), field: 'created_at', sortable: true, format: formatDate },
      { name: 'customer_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.customer`), field: 'customer_name', sortable: true },
      { name: 'police_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.policeNumber`), field: 'police_number', sortable: true },
      { name: 'delivery_status', align: 'left', label: nuxt.$getTranslation(`shared.columns.deliveryStatus`), field: 'delivery_status', sortable: true },
      actionColumn
    ],
    itemDeliveryDetailItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'barcode', field: 'barcode', label: nuxt.$getTranslation('shared.columns.barcode'), align: 'center', sortable: true },
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'left', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'left', sortable: true },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'return_quantity', field: 'return_quantity', label: nuxt.$getTranslation('shared.columns.returnQuantity'), align: 'center', sortable: true, format: formatPrice },
    ] as any[],
    salesTable: [
      { name: 'invoice_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceNumber`), field: 'invoice_number', sortable: true },
      { name: 'created_at', align: 'left', label: nuxt.$getTranslation(`shared.columns.date`), field: 'created_at', sortable: true, format: formatDate },
      { name: 'customer_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.customer`), field: 'customer_name', sortable: true },
      { name: 'status', align: 'left', label: nuxt.$getTranslation(`shared.columns.status`), field: 'status', sortable: true },
      { name: 'payment_status', align: 'left', label: nuxt.$getTranslation(`shared.columns.paymentStatus`), field: 'payment_status', sortable: true },
      { name: 'delivery_status', align: 'left', label: nuxt.$getTranslation(`shared.columns.deliveryStatus`), field: 'delivery_status', sortable: true },
      actionColumn
    ],
    salesReturnTable: [
      { name: 'invoice_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceNumber`), field: 'invoice_number', sortable: true },
      { name: 'created_at', align: 'left', label: nuxt.$getTranslation(`shared.columns.date`), field: 'created_at', sortable: true },
      { name: 'status', align: 'left', label: nuxt.$getTranslation(`shared.columns.status`), field: 'status', sortable: true },
      { name: 'invoice_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.returnedAmount`), field: 'invoice_amount', sortable: true, format: formatPrice },
      actionColumn
    ],
    outstandingSalesTable: [
      { name: 'invoice_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceNumber`), field: 'invoice_number', sortable: true },
      { name: 'created_at', align: 'left', label: nuxt.$getTranslation(`shared.columns.date`), field: 'created_at', sortable: true },
      { name: 'customer_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.customer`), field: 'customer_name', sortable: true },
      { name: 'invoice_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.invoiceAmount`), field: 'invoice_amount', sortable: true, format: formatPrice },
      { name: 'outstanding_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.outstandingAmount`), field: 'outstanding_amount', sortable: true, format: formatPrice },
      { name: 'paid_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.paidAmount`), field: 'paid_amount', sortable: true, format: formatPrice },
      { name: 'returned_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.returnedAmount`), field: 'returned_amount', sortable: true, format: formatPrice },
    ],
    purchasesTable: [
      { name: 'invoice_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceNumber`), field: 'invoice_number', sortable: true },
      { name: 'invoice_date', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceDate`), field: 'invoice_date', sortable: true },
      { name: 'invoice_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.invoiceAmount`), field: 'invoice_amount', sortable: true, format: formatPrice },
      { name: 'paid_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.paidAmount`), field: 'paid_amount', sortable: true, format: formatPrice },
      { name: 'returned_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.returnedAmount`), field: 'returned_amount', sortable: true, format: formatPrice },
      { name: 'outstanding_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.outstandingAmount`), field: 'outstanding_amount', sortable: true, format: formatPrice },
      { name: 'due_date', align: 'left', label: nuxt.$getTranslation(`shared.columns.dueDate`), field: 'due_date', sortable: true },
      { name: 'payment_status', align: 'left', label: nuxt.$getTranslation(`shared.columns.paymentStatus`), field: 'payment_status', sortable: true },
      { name: 'delivery_status', align: 'left', label: nuxt.$getTranslation(`shared.columns.deliveryStatus`), field: 'delivery_status', sortable: true },
      actionColumn
    ],
    purchasesReturnTable: [
      { name: 'invoice_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceNumber`), field: 'invoice_number', sortable: true },
      { name: 'created_at', align: 'left', label: nuxt.$getTranslation(`shared.columns.date`), field: 'created_at', sortable: true },
      { name: 'status', align: 'left', label: nuxt.$getTranslation(`shared.columns.status`), field: 'status', sortable: true },
      { name: 'invoice_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.returnedAmount`), field: 'invoice_amount', sortable: true, format: formatPrice },
      actionColumn
    ],
    outstandingPurchasesTable: [
      { name: 'invoice_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceNumber`), field: 'invoice_number', sortable: true },
      { name: 'invoice_date', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceDate`), field: 'invoice_date', sortable: true },
      { name: 'invoice_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.invoiceAmount`), field: 'invoice_amount', sortable: true, format: formatPrice },
      { name: 'paid_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.paidAmount`), field: 'paid_amount', sortable: true, format: formatPrice },
      { name: 'returned_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.returnedAmount`), field: 'returned_amount', sortable: true, format: formatPrice },
      { name: 'outstanding_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.outstandingAmount`), field: 'outstanding_amount', sortable: true, format: formatPrice },
      { name: 'due_date', align: 'left', label: nuxt.$getTranslation(`shared.columns.dueDate`), field: 'due_date', sortable: true },
      { name: 'report_date', align: 'left', label: nuxt.$getTranslation(`shared.columns.reportDate`), field: 'report_date', sortable: true },
    ],
    adminReceivingTable: [
      { name: 'id', align: 'left', label: nuxt.$getTranslation(`shared.columns.id`), field: 'id', searchable: false, sortable: true },
      { name: 'supplier_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.supplier`), field: 'supplier_name' },
      { name: 'warehouse_name', align: 'left', label: nuxt.$getTranslation('shared.columns.warehouse'), field: 'warehouse_name' },
      { name: 'total_item', align: 'center', label: nuxt.$getTranslation(`shared.columns.totalItem`), field: 'total_item' },
      actionColumn
    ],
    adminReceivingItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'center', sortable: true, format: formatPrice },
      { name: 'outstanding_quantity', field: 'outstanding_quantity', label: nuxt.$getTranslation('shared.columns.outstandingQuantity'), align: 'center', sortable: true, format: formatPrice },
      { name: 'received_quantity', field: 'received_quantity', label: nuxt.$getTranslation('shared.columns.receivedQuantity'), align: 'center', sortable: true, format: formatPrice },
      actionButtonCustomColumn(nuxt.$getTranslation('shared.buttons.receive'))
    ] as any[],
    adminReceivingPurchaseItemsTable: [
      { name: 'invoice_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoiceNumber`), field: 'invoice_number', sortable: true },
      { name: 'price', field: 'price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'center', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'center', sortable: true, format: formatPrice },
      { name: 'outstanding_quantity', field: 'outstanding_quantity', label: nuxt.$getTranslation('shared.columns.outstandingQuantity'), align: 'center', sortable: true, format: formatPrice },
      { name: 'received_quantity', field: 'received_quantity', label: nuxt.$getTranslation('shared.columns.receivedQuantity'), align: 'center', sortable: true, format: formatPrice },
    ] as any[],
    warehouseReceivingTable: [
      { name: 'id', align: 'left', label: nuxt.$getTranslation(`shared.columns.id`), field: 'id', searchable: false, sortable: true },
      { name: 'supplier_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.supplier`), field: 'supplier_name' },
      { name: 'warehouse_name', align: 'left', label: nuxt.$getTranslation('shared.columns.warehouse'), field: 'warehouse_name' },
      { name: 'total_item', align: 'center', label: nuxt.$getTranslation(`shared.columns.totalItem`), field: 'total_item' },
      actionColumn
    ],
    warehouseReceivingFormItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'center', sortable: true, format: formatPrice },
      actionColumn
    ] as any[],
    warehouseReceivingItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'center', sortable: true, format: formatPrice },
    ] as any[],
    warehouseStockTransfersTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'supplier_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.supplier`), field: 'supplier_name' },
      { name: 'warehouse_name_from', field: 'warehouse_name_from', label: nuxt.$getTranslation('shared.columns.warehouseFrom'), align: 'left', sortable: true },
      { name: 'warehouse_name_to', field: 'warehouse_name_to', label: nuxt.$getTranslation('shared.columns.warehouseTo'), align: 'left', sortable: true },
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'center', sortable: true, format: formatPrice },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'left', sortable: true, format: formatPrice },
    ],
    warehouseStockTransfersFormTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'supplier_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.supplier`), field: 'supplier_name' },
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'left', sortable: true },
      { name: 'stock', field: 'stock', label: nuxt.$getTranslation('shared.columns.currentStock'), align: 'left', sortable: true, format: formatPrice },
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'center', sortable: true, format: formatPrice },
      actionButtonCustomColumn(nuxt.$getTranslation('shared.buttons.transfer'))
    ],
    stockAdjustmentsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'item_barcode', field: 'item_barcode', label: nuxt.$getTranslation('shared.columns.barcode'), align: 'center', sortable: true },
      { name: 'supplier_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.supplier`), field: 'supplier_name' },
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'left', sortable: true },
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'center', sortable: true, format: formatPrice },
      { name: 'stock_before', field: 'stock_before', label: nuxt.$getTranslation('shared.columns.stockBefore'), align: 'left', sortable: true, format: formatPrice },
      { name: 'stock_after', field: 'stock_after', label: nuxt.$getTranslation('shared.columns.stockAfter'), align: 'left', sortable: true, format: formatPrice },
    ],
    stockAdjustmentsFormTable: [
      { name: 'items.name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'items.code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'items.barcode', field: 'item_barcode', label: nuxt.$getTranslation('shared.columns.barcode'), align: 'center', sortable: true },
      { name: 'suppliers.name', field: 'supplier_name', label: nuxt.$getTranslation(`shared.columns.supplier`), align: 'left' },
      { name: 'warehouses.name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'left', sortable: true },
      { name: 'stock', field: 'stock', label: nuxt.$getTranslation('shared.columns.currentStock'), align: 'left', sortable: true, format: formatPrice },
      { name: 'item_base_prices.purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'center', sortable: true, format: formatPrice },
      actionButtonCustomColumn(nuxt.$getTranslation('shared.buttons.adjustments'))
    ],
    itemsTable: [
      { name: 'name', label: nuxt.$getTranslation(`shared.columns.name`), align: 'left', field: 'name', sortable: true },
      { name: 'code', align: 'center', label: nuxt.$getTranslation(`shared.columns.code`), field: 'code', sortable: true },
      { name: 'barcode', align: 'center', label: nuxt.$getTranslation(`shared.columns.barcode`), field: 'barcode', sortable: true },
      { name: 'unit_name', label: nuxt.$getTranslation(`shared.columns.unit`), field: 'unit_name', sortable: true },
      { name: 'category_name', label: nuxt.$getTranslation(`shared.columns.category`), field: 'category_name', sortable: true },
      { name: 'supplier_name', label: nuxt.$getTranslation(`shared.columns.supplier`), field: 'supplier_name', sortable: true },
      { name: 'sub_category_name', label: nuxt.$getTranslation(`shared.columns.subCategory`), field: 'sub_category_name', sortable: true },
      { name: 'actions', label: nuxt.$getTranslation(`shared.columns.action`), field: '', align: 'center' },
    ],
    supplierItemsTable: [
      { name: 'stores_name', label: nuxt.$getTranslation(`shared.columns.store`), align: 'left', field: 'stores_name', sortable: true },
      { name: 'name', label: nuxt.$getTranslation(`shared.columns.name`), align: 'left', field: 'name', sortable: true },
      { name: 'code', align: 'center', label: nuxt.$getTranslation(`shared.columns.code`), field: 'code', sortable: true },
      { name: 'barcode', align: 'center', label: nuxt.$getTranslation(`shared.columns.barcode`), field: 'barcode', sortable: true },
      { name: 'unit_name', label: nuxt.$getTranslation(`shared.columns.unit`), field: 'unit_name', sortable: true },
      { name: 'category_name', label: nuxt.$getTranslation(`shared.columns.category`), field: 'category_name', sortable: true },
      { name: 'supplier_name', label: nuxt.$getTranslation(`shared.columns.supplier`), field: 'supplier_name', sortable: true },
      { name: 'sub_category_name', label: nuxt.$getTranslation(`shared.columns.subCategory`), field: 'sub_category_name', sortable: true },
      { name: 'actions', label: nuxt.$getTranslation(`shared.columns.action`), field: '', align: 'center' },
    ],
    customersTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      { name: 'limit_outstanding_amount', align: 'right', label: nuxt.$getTranslation(`shared.columns.limitOutstandingAmount`), field: 'limit_outstanding_amount', sortable: true, format: formatPrice },
      actionColumn
    ],
    categoriesTable: [
      { name: 'id', align: 'left', label: nuxt.$getTranslation(`shared.columns.id`), field: 'id', searchable: false, sortable: true },
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', searchable: true, sortable: true },
      {
        name: 'children', label: nuxt.$getTranslation(`shared.columns.subCategory`), field: 'id', align: 'center', searchable: false,
        format: (val: any) => `${val}/sub-categories`
      },
      actionColumn
    ],
    subCategoriesTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    suppliersTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      { name: 'code', align: 'left', label: nuxt.$getTranslation(`shared.columns.code`), field: 'code', sortable: true },
      { name: 'total_item', align: 'right', label: nuxt.$getTranslation(`shared.columns.totalItem`), field: 'total_item', sortable: true, format: formatPrice },
      actionColumn
    ],
    warehousesTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      { name: 'address', align: 'left', label: nuxt.$getTranslation(`shared.columns.address`), field: 'address', sortable: true },
      actionColumn
    ],
    expeditionsTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    unitsTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    itemUnitsTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      { name: 'quantity', align: 'left', label: nuxt.$getTranslation(`shared.columns.quantity`), field: 'quantity', sortable: true, format: formatPrice },
      actionColumn
    ],
    itemUnitsWizardTable: [
      { name: 'unit_id', align: 'left', label: nuxt.$getTranslation(`shared.columns.unit`), field: 'unit_id', sortable: true },
      { name: 'quantity', align: 'left', label: nuxt.$getTranslation(`shared.columns.quantity`), field: 'quantity', sortable: true, format: formatPrice },
      actionColumn
    ],
    itemStockPricesTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'item_barcode', field: 'item_barcode', label: nuxt.$getTranslation('shared.columns.barcode'), align: 'center', sortable: true },
      { name: 'price_category_name', field: 'price_category_name', label: nuxt.$getTranslation('shared.columns.priceCategory'), align: 'left', sortable: true },
      { name: 'stock', field: 'stock', label: nuxt.$getTranslation('shared.columns.stock'), align: 'left', sortable: true },
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'left', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'left', sortable: true },
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'cost', field: 'cost', label: nuxt.$getTranslation('shared.columns.cost'), align: 'right', sortable: true, format: formatPrice },
      { name: 'profit', field: 'profit', label: nuxt.$getTranslation('shared.columns.profit'), align: 'right', sortable: true, format: formatPrice },
      { name: 'sell_price', field: 'sell_price', label: nuxt.$getTranslation('shared.columns.sellPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'default_price', field: 'default_price', label: nuxt.$getTranslation('shared.columns.defaultPrice'), align: 'right', sortable: true, format: formatPrice },
      actionSelectColumn
    ],
    itemBasePricesTable: [
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'cost', field: 'cost', label: nuxt.$getTranslation('shared.columns.cost'), align: 'right', sortable: true, format: formatPrice },
      actionColumn
    ],
    itemSellPricesTableByBasePrice: [
      { name: 'price_category_name', field: 'price_category_name', label: nuxt.$getTranslation('shared.columns.priceCategory'), align: 'right', sortable: true },
      { name: 'profit', field: 'profit', label: nuxt.$getTranslation('shared.columns.profit'), align: 'right', sortable: true, format: formatPrice },
      { name: 'sell_price', field: 'sell_price', label: nuxt.$getTranslation('shared.columns.sellPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'default_price', field: 'default_price', label: nuxt.$getTranslation('shared.columns.defaultPrice'), align: 'right', sortable: true, format: formatPrice },
      actionColumn
    ],
    itemSellPricesTable: [
      { name: 'price_category_name', field: 'price_category_name', label: nuxt.$getTranslation('shared.columns.priceCategory'), align: 'left', sortable: true },
      { name: 'profit', field: 'profit', label: nuxt.$getTranslation('shared.columns.profit'), align: 'left', sortable: true, format: formatPrice },
      { name: 'sell_price', field: 'sell_price', label: nuxt.$getTranslation('shared.columns.sellPrice'), align: 'left', sortable: true, format: formatPrice },
      { name: 'default_price', field: 'default_price', label: nuxt.$getTranslation('shared.columns.defaultPrice'), align: 'left', sortable: true, format: formatPrice },
    ],
    itemStocksTableByBasePrice: [
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'center', sortable: true },
      { name: 'stock', field: 'stock', label: nuxt.$getTranslation('shared.columns.stock'), align: 'center', sortable: true, format: formatPrice }
    ],
    itemStockAlerts: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'supplier_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.supplier`), field: 'supplier_name' },
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'left', sortable: true },
      { name: 'stock', field: 'stock', label: nuxt.$getTranslation('shared.columns.currentStock'), align: 'right', sortable: true, format: formatPrice },
      { name: 'stock_alert', field: 'stock_alert', label: nuxt.$getTranslation('shared.columns.stockAlert'), align: 'right', sortable: true, format: formatPrice },
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'right', sortable: true, format: formatPrice }
    ],
    saleItemsTable: [
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'price_category_name', field: 'price_category_name', label: nuxt.$getTranslation('shared.columns.priceCategory'), align: 'left', sortable: true },
      { name: 'sell_price', field: 'sell_price', label: nuxt.$getTranslation('shared.columns.sellPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'left', sortable: true, width: '75px' },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'left', sortable: true, format: formatPrice },
      { name: 'stock', field: 'stock', label: nuxt.$getTranslation('shared.columns.stock'), align: 'right', sortable: true, format: formatPrice },
      { name: 'discount_percentage', field: 'discount_percentage', label: nuxt.$getTranslation('shared.columns.discountPercentage'), align: 'left', sortable: true },
      { name: 'discount_value', field: 'discount_value', label: nuxt.$getTranslation('shared.columns.discountValue'), align: 'left', sortable: true, format: formatPrice },
      { name: 'sub_total_price', field: 'sub_total_price', label: nuxt.$getTranslation('shared.labels.subTotalPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'tax', field: 'tax', label: nuxt.$getTranslation('shared.labels.tax') + ' (' + nuxt.$taxPercentage() + '%)', align: 'right', sortable: true, format: formatPrice },
      { name: 'total_price', field: 'total_price', label: nuxt.$getTranslation('shared.labels.totalPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'left', sortable: true },
      actionColumn
    ] as any[],
    saleItemHistoriesTable: [
      { name: 'created_at', field: 'created_at', label: nuxt.$getTranslation('shared.columns.createdAt'), align: 'center', sortable: true },
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'cost', field: 'cost', label: nuxt.$getTranslation('shared.columns.cost'), align: 'right', sortable: true, format: formatPrice },
      { name: 'profit', field: 'profit', label: nuxt.$getTranslation('shared.columns.profit'), align: 'right', sortable: true, format: formatPrice },
      { name: 'default_price', field: 'default_price', label: nuxt.$getTranslation('shared.columns.defaultPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'sell_price', field: 'sell_price', label: nuxt.$getTranslation('shared.columns.sellPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'left', sortable: true },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'left', sortable: true, format: formatPrice },
      { name: 'discount_percentage', field: 'discount_percentage', label: nuxt.$getTranslation('shared.columns.discountPercentage'), align: 'left', sortable: true },
      { name: 'discount_value', field: 'discount_value', label: nuxt.$getTranslation('shared.columns.discountValue'), align: 'left', sortable: true, format: formatPrice },
      { name: 'total_price', field: 'total_price', label: nuxt.$getTranslation('shared.labels.totalPrice'), align: 'left', sortable: true, format: formatPrice },
    ] as any[],
    saleDetailItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'price_category_name', field: 'price_category_name', label: nuxt.$getTranslation('shared.columns.priceCategory'), align: 'left', sortable: true },
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'left', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'left', sortable: true },
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'cost', field: 'cost', label: nuxt.$getTranslation('shared.columns.cost'), align: 'right', sortable: true, format: formatPrice },
      { name: 'profit', field: 'profit', label: nuxt.$getTranslation('shared.columns.profit'), align: 'right', sortable: true, format: formatPrice },
      { name: 'sell_price', field: 'sell_price', label: nuxt.$getTranslation('shared.columns.sellPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'default_price', field: 'default_price', label: nuxt.$getTranslation('shared.columns.defaultPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'received_quantity', field: 'received_quantity', label: nuxt.$getTranslation('shared.columns.receivedQuantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'outstanding_quantity', field: 'outstanding_quantity', label: nuxt.$getTranslation('shared.columns.outstandingQuantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'discount_percentage', field: 'discount_percentage', label: nuxt.$getTranslation('shared.columns.discountPercentage'), align: 'right', sortable: true },
      { name: 'discount_value', field: 'discount_value', label: nuxt.$getTranslation('shared.columns.discountValue'), align: 'right', sortable: true, format: formatPrice },
      { name: 'tax_amount', field: 'tax_amount', label: nuxt.$getTranslation('shared.labels.tax') + ' (' + nuxt.$taxPercentage() + '%)', align: 'right', sortable: true, format: formatPrice },
      { name: 'total_price', field: 'total_price', label: nuxt.$getTranslation('shared.labels.totalPrice'), align: 'right', sortable: true, format: formatPrice },
      actionButtonCustomColumn(nuxt.$getTranslation('shared.buttons.send'))
    ] as any[],
    saleReturnItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'warehouse_name', field: 'warehouse_name', label: nuxt.$getTranslation('shared.columns.warehouse'), align: 'center', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true },
      { name: 'sell_price', field: 'sell_price', label: nuxt.$getTranslation('shared.columns.sellPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'received_quantity', field: 'received_quantity', label: nuxt.$getTranslation('shared.columns.receivedQuantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'returned_quantity', field: 'returned_quantity', label: nuxt.$getTranslation('shared.columns.returnQuantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'discount_percentage', field: 'discount_percentage', label: nuxt.$getTranslation('shared.columns.discountPercentage'), align: 'center', sortable: true },
      { name: 'total_price', field: 'total_price', label: nuxt.$getTranslation('shared.labels.totalPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'total_return_amount', field: 'total_return_amount', label: nuxt.$getTranslation('shared.labels.totalReturnAmount'), align: 'right', sortable: true, format: formatPrice },
    ] as any[],
    purchaseReturnItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true },
      { name: 'price', field: 'price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'received_quantity', field: 'received_quantity', label: nuxt.$getTranslation('shared.columns.receivedQuantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'returned_quantity', field: 'returned_quantity', label: nuxt.$getTranslation('shared.columns.returnQuantity'), align: 'right', sortable: true, format: formatPrice },
    ] as any[],
    purchaseFormItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'item_base_price_id', field: 'item_base_price_id', label: nuxt.$getTranslation('shared.columns.basePrice') + ' (' + nuxt.$getTranslation('shared.columns.stock') + ')', align: 'center', sortable: true },
      { name: 'price', field: 'price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'center', sortable: true, format: formatPrice },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true, style: 'width: 20px' },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'center', sortable: true, format: formatPrice },
      { name: 'discount_percentage', field: 'discount_percentage', label: nuxt.$getTranslation('shared.columns.discountPercentage'), align: 'left', sortable: true },
      { name: 'discount_value', field: 'discount_value', label: nuxt.$getTranslation('shared.columns.discountValue'), align: 'left', sortable: true, format: formatPrice },
      { name: 'sub_total_price', field: 'sub_total_price', label: nuxt.$getTranslation('shared.labels.subTotalPrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'tax', field: 'tax', label: nuxt.$getTranslation('shared.labels.tax') + ' (' + nuxt.$taxPercentage() + '%)', align: 'right', sortable: true, format: formatPrice },
      { name: 'total_price', field: 'total_price', label: nuxt.$getTranslation('shared.labels.totalPrice'), align: 'right', sortable: true, format: formatPrice },
      actionColumn
    ] as any[],
    purchaseItemsTable: [
      { name: 'item_name', field: 'item_name', label: nuxt.$getTranslation('shared.columns.item'), align: 'center', sortable: true },
      { name: 'item_code', field: 'item_code', label: nuxt.$getTranslation('shared.columns.code'), align: 'center', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true },
      { name: 'price', field: 'price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'received_quantity', field: 'received_quantity', label: nuxt.$getTranslation('shared.columns.receivedQuantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'outstanding_quantity', field: 'outstanding_quantity', label: nuxt.$getTranslation('shared.columns.outstandingQuantity'), align: 'right', sortable: true, format: formatPrice },
      { name: 'discount_percentage', field: 'discount_percentage', label: nuxt.$getTranslation('shared.columns.discountPercentage'), align: 'right', sortable: true },
      { name: 'discount_value', field: 'discount_value', label: nuxt.$getTranslation('shared.columns.discountValue'), align: 'right', sortable: true, format: formatPrice },
      { name: 'tax_amount', field: 'tax_amount', label: nuxt.$getTranslation('shared.labels.tax') + ' (' + nuxt.$taxPercentage() + '%)', align: 'right', sortable: true, format: formatPrice },
      { name: 'total_price', field: 'total_price', label: nuxt.$getTranslation('shared.labels.totalPrice'), align: 'right', sortable: true, format: formatPrice },
      actionButtonCustomColumn(nuxt.$getTranslation('shared.buttons.receive'))
    ] as any[],
    purchaseItemHistoriesTable: [
      { name: 'created_at', field: 'created_at', label: nuxt.$getTranslation('shared.columns.createdAt'), align: 'center', sortable: true },
      { name: 'price', field: 'price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'center', sortable: true },
      { name: 'unit_name', field: 'unit_name', label: nuxt.$getTranslation('shared.columns.unit'), align: 'center', sortable: true },
      { name: 'quantity', field: 'quantity', label: nuxt.$getTranslation('shared.columns.quantity'), align: 'left', sortable: true, format: formatPrice },
      { name: 'item_base_price_id', field: 'item_base_price_id', label: nuxt.$getTranslation('shared.columns.basePrice'), align: 'center', sortable: true, format: formatPrice },
      { name: 'purchase_price', field: 'purchase_price', label: nuxt.$getTranslation('shared.columns.purchasePrice'), align: 'right', sortable: true, format: formatPrice },
      { name: 'cost', field: 'cost', label: nuxt.$getTranslation('shared.columns.basePrice'), align: 'right', sortable: true, format: formatPrice },
    ] as any[],
    purchasePaymentsTable: [
      { name: 'account_name', field: 'account_name', label: nuxt.$getTranslation('shared.columns.account'), align: 'center', sortable: true },
      { name: 'amount', field: 'amount', label: nuxt.$getTranslation('shared.columns.paidAmount'), align: 'right', sortable: true, format: formatPrice },
      { name: 'created_at', field: 'created_at', label: nuxt.$getTranslation('shared.columns.createdAt'), align: 'center', sortable: true, format: formatDate },
      { name: 'created_by_name', field: 'created_by_name', label: nuxt.$getTranslation('shared.columns.createdBy'), align: 'center', sortable: true },
    ] as any[],
    priceCategoriesTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    accountsTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      { name: 'number', align: 'left', label: nuxt.$getTranslation(`shared.columns.accountNumber`), field: 'number', sortable: true },
      { name: 'account_type_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.accountType`), field: 'account_type_name', data: 'account_type_name', sortable: true },
      actionColumn
    ],
    storesTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      { name: 'invoice_prefix', align: 'left', label: nuxt.$getTranslation(`shared.columns.invoicePrefix`), field: 'invoice_prefix', sortable: true },
      { name: 'tax_percentage', align: 'left', label: nuxt.$getTranslation(`shared.columns.tax`), field: 'tax_percentage', sortable: true },
      { name: 'sale_lower_price_permission', align: 'left', label: nuxt.$getTranslation(`shared.columns.saleLowerPricePermission`), field: 'sale_lower_price_permission', sortable: true, format: formatBoolean },
      { name: 'whatsapp_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.whatsappNumber`), field: 'whatsapp_number', sortable: true },
      { name: 'is_whatsapp_group', align: 'left', label: nuxt.$getTranslation(`shared.columns.isWhatsappGroup`), field: 'is_whatsapp_group', sortable: true, format: formatBoolean },
      actionColumn
    ],
    userStoresTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    userRolesTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    accountTypesTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    serviceTypesTable: [
      { name: 'name', align: 'left', label: nuxt.$getTranslation(`shared.columns.name`), field: 'name', sortable: true },
      actionColumn
    ],
    depositsTable: [
      { name: 'account_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.account`), field: 'account_name', sortable: true },
      { name: 'voucher_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.voucherNumber`), field: 'voucher_number', sortable: true },
      { name: 'date', align: 'left', label: nuxt.$getTranslation(`shared.columns.date`), field: 'date', sortable: true },
      { name: 'amount', align: 'left', label: nuxt.$getTranslation(`shared.columns.amount`), field: 'amount', sortable: true, format: formatPrice },
      actionColumn
    ],
    depositEntriesFormTable: [
      { name: 'account_id', field: 'account_id', label: nuxt.$getTranslation('shared.columns.account'), align: 'center', sortable: true },
      { name: 'amount', field: 'amount', label: nuxt.$getTranslation('shared.columns.amount'), align: 'center', sortable: true, format: formatPrice },
      { name: 'description', field: 'description', label: nuxt.$getTranslation('shared.columns.description'), align: 'center', sortable: true },
      actionColumn
    ] as any[],
    depositEntriesTable: [
      { name: 'account_name', field: 'account_name', label: nuxt.$getTranslation('shared.columns.account'), align: 'center', sortable: true },
      { name: 'amount', field: 'amount', label: nuxt.$getTranslation('shared.columns.amount'), align: 'center', sortable: true, format: formatPrice },
      { name: 'description', field: 'description', label: nuxt.$getTranslation('shared.columns.description'), align: 'center', sortable: true }
    ] as any[],
    expensesTable: [
      { name: 'account_name', align: 'left', label: nuxt.$getTranslation(`shared.columns.account`), field: 'account_name', sortable: true },
      { name: 'voucher_number', align: 'left', label: nuxt.$getTranslation(`shared.columns.voucherNumber`), field: 'voucher_number', sortable: true },
      { name: 'date', align: 'left', label: nuxt.$getTranslation(`shared.columns.date`), field: 'date', sortable: true },
      { name: 'amount', align: 'left', label: nuxt.$getTranslation(`shared.columns.amount`), field: 'amount', sortable: true, format: formatPrice },
      actionColumn
    ],
    expenseEntriesFormTable: [
      { name: 'account_id', field: 'account_id', label: nuxt.$getTranslation('shared.columns.account'), align: 'center', sortable: true },
      { name: 'amount', field: 'amount', label: nuxt.$getTranslation('shared.columns.amount'), align: 'center', sortable: true, format: formatPrice },
      { name: 'description', field: 'description', label: nuxt.$getTranslation('shared.columns.description'), align: 'center', sortable: true },
      actionColumn
    ] as any[],
    expenseEntriesTable: [
      { name: 'account_name', field: 'account_name', label: nuxt.$getTranslation('shared.columns.account'), align: 'center', sortable: true },
      { name: 'amount', field: 'amount', label: nuxt.$getTranslation('shared.columns.amount'), align: 'center', sortable: true, format: formatPrice },
      { name: 'description', field: 'description', label: nuxt.$getTranslation('shared.columns.description'), align: 'center', sortable: true }
    ] as any[],
  }
  return columns
}