import { Injectable } from '@nestjs/common';
import * as EmailValidator from 'email-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class TypeValidationService {
  validEmail(email: string) {
    return EmailValidator.validate(email);
  }

  validCpf(str: string) {
    return cpf.isValid(str);
  }

  validCnpj(str: string) {
    return cnpj.isValid(str);
  }

  formatCpf(str: string) {
    return cpf.format(str);
  }

  formatCnpj(str: string) {
    return cnpj.format(str);
  }
}
