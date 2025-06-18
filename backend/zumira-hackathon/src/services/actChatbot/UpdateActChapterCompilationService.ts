import { UpdateActChapterCompilationRequest } from "../../definitions/actChatbot";
import prismaClient from "../../prisma";

class UpdateActChapterCompilationService {
  async execute({ userId, actChapterId, compilation }: UpdateActChapterCompilationRequest) {
    const chapter = await prismaClient.actChapter.findFirst({
      where: {
        id: actChapterId,
        userId,
      },
    });

    if (!chapter) throw new Error("Chapter not found");

    const result = await prismaClient.actChapter.update({
      where: {
        id: actChapterId,
        userId,
      },
      data: {
        compilation,
      },
    });

    return result;
  }
}

export { UpdateActChapterCompilationService };
