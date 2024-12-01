export type Coin = {
  id: number
  symbol: string
  name: string
  nameid: string
  rank: number
  price_usd: number
  percent_change_24h: number
  percent_change_1h: number
  percent_change_7d: number
  price_btc: number
  market_cap_usd: number
  volume24: number
  volume24a: number
  csupply: number
  tsupply: number
  msupply: number
}
// export type Coin = {
//   id: string
//   symbol: string
//   name: string
//   nameid: string
//   rank: number
//   price_usd: string
//   percent_change_24h: string
//   percent_change_1h: string
//   percent_change_7d: string
//   price_btc: string
//   market_cap_usd: string
//   volume24: number
//   volume24a: number
//   csupply: string
//   tsupply: string
//   msupply: string
// }

export type ApiResponse = {
  data: Coin[]
}

export type sortAndFilter = {
  [K in keyof Coin]?: {
    isAsc?: boolean
    filterPattern?: string
  }
}

export type Header<T> = {
  title: T
  isAsc?: boolean
  filterPattern?: string
}
