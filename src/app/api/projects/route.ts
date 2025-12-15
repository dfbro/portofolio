
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'src/data/projects.json');

export async function GET() {
  try {
    const data = await fs.readFile(projectsFilePath, 'utf-8');
    const json = JSON.parse(data);
    return NextResponse.json(json.projects);
  } catch (error) {
    console.error('Error reading projects data:', error);
    return NextResponse.json({ message: 'Error reading projects data' }, { status: 500 });
  }
}
