interface IProject {
  Api: {
    Url: string;
  };
}

const ProjectProd: IProject = {
  Api: {
    Url: 'https://us-central1-folderly-app.cloudfunctions.net/',
  },
};

const ProjectDev: IProject = {
  Api: {
    Url: 'http://localhost:5000/',
  },
};

export const Project: IProject =
  process.env.NODE_ENV !== 'production' ? ProjectDev : ProjectProd;
