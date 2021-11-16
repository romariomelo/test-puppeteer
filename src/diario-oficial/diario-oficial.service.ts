import { Injectable } from '@nestjs/common';
import { hasKeywords, highlightsKeywords } from 'src/utils/highlights-keywords';
import { DiarioOficialCrawler } from './DiarioOficialCrawler';

@Injectable()
export class DiarioOficialService {
  async getDiario() {
    const textoMaterias = [];
    const doCrawler = new DiarioOficialCrawler();
    const materias = doCrawler.filterByOrgao(
      doCrawler.getMaterias(await doCrawler.getPage()),
    );
    for (const materia of materias) {
      console.info(`>>> Buscando texto da matéria: ${materia.title}`);
      const textoMateria = await doCrawler.getTextMateria(materia.urlTitle);
      if (hasKeywords(textoMateria)) {
        textoMaterias.push(highlightsKeywords(textoMateria));
      }
    }
    console.info('>>> Busca finalizada');
    return textoMaterias;
  }
}
