import { permissionView } from "~/constants/permission"

export function useMenu() {
  const nuxt = useNuxtApp()

  let menus: any[] = [], prefix = ''

  if (nuxt.$getActiveModule() === 'stores') {
    prefix = '/stores/{storeId}/'
    menus = [
      {
        title: nuxt.$getTranslation('navigation.storeProfile'),
        icon: 'store',
        link: prefix + 'profile'
      },
      {
        title: nuxt.$getTranslation('navigation.transactional'),
        link: null,
        children: [
          {
            title: nuxt.$getTranslation('modules.sales.title'),
            link: null,
            children: [
              {
                title: nuxt.$getTranslation('modules.salesList.title'),
                icon: 'storefront',
                link: prefix + 'sales'
              },
              {
                title: nuxt.$getTranslation('modules.saleReturns.title'),
                icon: 'east',
                link: prefix + 'sale-returns'
              },
            ]
          },
          {
            title: nuxt.$getTranslation('modules.purchases.title'),
            link: null,
            children: [
              {
                title: nuxt.$getTranslation('modules.purchases.title'),
                icon: 'shop',
                link: prefix + 'purchases'
              },
              {
                title: nuxt.$getTranslation('modules.purchaseReturns.title'),
                icon: 'west',
                link: prefix + 'purchase-returns'
              },
            ]
          },
          {
            title: nuxt.$getTranslation('modules.cashBanking.title'),
            link: null,
            children: [
              {
                title: nuxt.$getTranslation('modules.deposits.title'),
                icon: 'add_shopping_cart',
                link: prefix + 'deposits'
              },
              {
                title: nuxt.$getTranslation('modules.expenses.title'),
                icon: 'local_atm',
                link: prefix + 'expenses'
              },
            ]
          },
        ]
      },
      {
        title: nuxt.$getTranslation('navigation.report'),
        link: null,
        children: [
          {
            title: nuxt.$getTranslation('modules.salesReport.title'),
            icon: 'assessment',
            link: prefix + 'reports/sales'
          },
          {
            title: nuxt.$getTranslation('modules.purchaseReport.title'),
            icon: 'bar_chart',
            link: prefix + 'reports/purchases'
          },
          {
            title: nuxt.$getTranslation('modules.stockAlert.title'),
            icon: 'inventory_2',
            link: prefix + 'reports/stock-alerts'
          },
        ]
      },
      {
        title: nuxt.$getTranslation('navigation.masterData'),
        link: null,
        children: [
          {
            title: nuxt.$getTranslation('modules.items.title'),
            icon: 'inventory',
            link: prefix + 'items'
          },
          {
            title: nuxt.$getTranslation('modules.categories.title'),
            icon: 'category',
            link: prefix + 'categories'
          },
          {
            title: nuxt.$getTranslation('modules.suppliers.title'),
            icon: 'business',
            link: prefix + 'suppliers'
          },
          {
            title: nuxt.$getTranslation('modules.customers.title'),
            icon: 'person',
            link: prefix + 'customers'
          },
          {
            title: nuxt.$getTranslation('modules.units.title'),
            icon: 'scale',
            link: prefix + 'units'
          },
          {
            title: nuxt.$getTranslation('modules.priceCategories.title'),
            icon: 'payments',
            link: prefix + 'price-categories'
          },
          {
            title: nuxt.$getTranslation('modules.serviceTypes.title'),
            icon: 'category',
            link: prefix + 'service-types'
          },
          {
            title: nuxt.$getTranslation('modules.accountTypes.title'),
            icon: 'account_balance_wallet',
            link: prefix + 'account-types'
          },
          {
            title: nuxt.$getTranslation('modules.accounts.title'),
            icon: 'account_balance_wallet',
            link: prefix + 'accounts'
          },
          {
            title: nuxt.$getTranslation('modules.expeditions.title'),
            icon: 'local_shipping',
            link: prefix + 'expeditions'
          }
        ]
      }
    ];
  } else if (nuxt.$getActiveModule() === 'warehouses') {
    prefix = '/warehouses/{warehouseId}/'
    menus = [
      {
        title: nuxt.$getTranslation('navigation.transactional'),
        link: null,
        children: [
          {
            title: nuxt.$getTranslation('modules.itemDeliveries.title'),
            icon: 'local_shipping',
            link: prefix + 'item-deliveries'
          },
          {
            title: nuxt.$getTranslation('modules.warehouseStockTransfers.title'),
            icon: 'swap_horiz',
            link: prefix + 'warehouse-stock-transfers'
          },
          {
            title: nuxt.$getTranslation('modules.stockAdjustments.title'),
            icon: 'border_color',
            link: prefix + 'stock-adjustments'
          },
        ]
      }
    ];
  } else if (nuxt.$getActiveModule() === 'companies') {
    prefix = '/companies/'
    menus = [
      {
        title: nuxt.$getTranslation(`modules.stores.title`),
        icon: 'store',
        link: prefix + 'stores'
      },
      {
        title: nuxt.$getTranslation(`modules.warehouses.title`),
        icon: 'warehouse',
        link: prefix + 'warehouses'
      },
      {
        title: nuxt.$getTranslation(`modules.users.title`),
        icon: 'person',
        link: prefix + 'users'
      },
      {
        title: nuxt.$getTranslation(`modules.roles.title`),
        icon: 'person',
        link: prefix + 'roles'
      }
    ];
  }

  menus = [
    {
      title: nuxt.$getTranslation('navigation.dashboard'),
      icon: 'dashboard',
      link: '/'
    },
    ...menus
  ]

  // Set default expansion panel to false
  menus = menus.map((menu: any) => {
    menu.active = true

    // TO-DO: Change menu.link.substring(1) to a new conventient way (read .module or so)
    menu.hasAccess = nuxt.$hasAccess(`${permissionView} ${menu.link?.substring(1)}`)

    if (menu.children && menu.children.length > 0) {
      menu.children = menu.children.map((child: any) => {
        child.active = true

        child.hasAccess = nuxt.$hasAccess(`${permissionView} ${child.link?.substring(1)}`)

        if (child.children && child.children.length > 0) {
          child.children = child.children.map((grandChild: any) => {
            grandChild.hasAccess = nuxt.$hasAccess(`${permissionView} ${grandChild.link?.substring(1)}`)
            return grandChild
          })
        }

        return child
      })
    }
    return menu
  })

  menus = menus.filter((menu: any) => {
    if (menu.hasAccess === false) return false
    if (menu.children && menu.children.length > 0) {
      menu.children = menu.children.filter((child: any) => {
        if (child.hasAccess === false) return false
        if (child.children && menu.children.length > 0) {
          menu.children = menu.children.filter((grandChild: any) => {
            if (grandChild.hasAcess === false) return false
            return true
          })
        }
        return true
      })
      if (menu.children.length === 0) return false
    } else if (menu.link) {
      return true
    } else {
      return false
    }
    return true
  })

  return menus
}