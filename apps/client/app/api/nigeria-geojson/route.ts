import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      'public/nigeria-geojson/state.geojson'
    );
    const fileContents = await fs.readFile(filePath, 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    console.error('Error reading GeoJSON file:', error);
    return NextResponse.json(
      { error: 'Failed to load GeoJSON data' },
      { status: 500 }
    );
  }
}
