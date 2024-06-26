export interface ClienteDTO {
  id: number;
  nome: string;
  endereco: EnderecoDTO;
}

export interface EnderecoDTO {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
