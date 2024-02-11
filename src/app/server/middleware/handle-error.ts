import errorHandler from '../../utils/error-handler';

const logError = (err) => {
  if (400 === err.status || 500 === err.status) {
    console.error(err);
  }
};

export default () => errorHandler(logError);
