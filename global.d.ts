// global.d.ts
declare namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      // ajoute ici d’autres variables si besoin, ex :
      // DATABASE_URL: string;
    }
  }

  