export const BASE_URL = 'https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu'

export async function getAllInfo (): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}`)

    return await response.json()
  } catch (error) {
    return error
  }
}
