import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), 'public/config')
  const termsPath = path.join(jsonDirectory, 'service-terms.json')
  const politicsPath = path.join(jsonDirectory, 'service-politics.json')

  try {
    const termsFile = await fs.readFile(termsPath, 'utf8')
    const politicsFile = await fs.readFile(politicsPath, 'utf8')
    const termsData = JSON.parse(termsFile)
    const politicsData = JSON.parse(politicsFile)

    return NextResponse.json({ terms: termsData, politics: politicsData })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read JSON files' },
      { status: 500 },
    )
  }
}
