import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const multiOpt = {
  dest: './upload',
  limits: {
    fieldNameSize: 200, // 필드명 최대값 입니다. (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
  storage: diskStorage({
    destination: (request, file, callback) => {
      //저장공간을 설정 합니다.
      const uploadPath = './upload';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      //파일 이름 설정 합니다.
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
  // fileFilter: (request, file, callback) => {
  //   // 확장자 필터링
  //   if (
  //     file.mimetype === 'image/png' ||
  //     file.mimetype === 'image/jpg' ||
  //     file.mimetype === 'image/jpeg'
  //   ) {
  //     callback(null, true); // 해당 mimetype만 받겠다는 의미
  //   } else {
  //     // 다른 mimetype은 저장되지 않음
  //     request.fileValidationError =
  //       'jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.';
  //     callback(null, false);
  //   }
  // },
};
