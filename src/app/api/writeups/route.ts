
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const writeupsFilePath = path.join(process.cwd(), 'src/data/writeups.json');

export async function GET() {
  try {
    const data = await fs.readFile(writeupsFilePath, 'utf-8');
    const json = JSON.parse(data);
    return NextResponse.json(json.writeups);
  } catch (error) {
    console.error('Error reading writeups data:', error);
    return NextResponse.json({ message: 'Error reading writeups data' }, { status: 500 });
  }
}
