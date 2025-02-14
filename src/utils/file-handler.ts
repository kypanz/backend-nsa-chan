import * as zl from 'zip-lib';
import fs from 'node:fs/promises';

interface IExtractFile {
  name: string;
}

interface IToBase64 {
  name: string;
}

export async function imgToBase64({ name }: IToBase64) {
  try {
    const test = await fs.readFile(`uploads/${name}`);
    return test.toString('base64');
  } catch (error) {
    console.error(error);
    return undefined;
  }
}


export async function extractFile({ name }: IExtractFile) {
  try {
    const path_extraction = `companions/${name}`;
    zl.extract(`uploads/${name}`, path_extraction);
    return path_extraction;
  } catch (error) {
    console.error(error);
    return false;
  }
}
