
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const skillsFilePath = path.join(process.cwd(), 'src/data/skills.json');

export async function GET() {
  try {
    const data = await fs.readFile(skillsFilePath, 'utf-8');
    const json = JSON.parse(data);
    return NextResponse.json(json);
  } catch (error) {
    console.error('Error reading skills data:', error);
    return NextResponse.json({ message: 'Error reading skills data' }, { status: 500 });
  }
}
