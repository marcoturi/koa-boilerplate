import { exampleRepository } from '../../infrastructure/repositories/example/example.repository';

type ServiceType = {
  exampleRepository: ReturnType<typeof exampleRepository>;
};

export default function exampleService({ exampleRepository }: ServiceType) {
  async function example(text: string) {
    return await exampleRepository.fetch(text);
  }

  return {
    example,
  };
}
