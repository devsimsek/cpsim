class AssemblyLexer {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.tokens = [];
    this.currentChar;
  }

  tokenize() {
    while (this.position < this.input.length) {
      let t = this.nextToken();
      this.tokens.push(t);
    }
    return this.tokens;
  }

  nextToken() {
    while (this.position < this.input.length) {
      this.currentChar = this.input[this.position];

      if (this.currentChar === " ") {
        this.skipWhitespace();
        continue;
      }

      if (
        this.input.slice(this.position, this.position + 2).charCodeAt(0) === 10
      ) {
        this.position++;
        this.currentChar =
          this.position < this.input.length
            ? this.input[this.position]
            : undefined;

        continue;
      }

      if (this.isDigit(this.currentChar)) {
        return this.integer();
      }

      if (
        this.currentChar === "L" &&
        this.input.slice(this.position, this.position + 4) === "LOAD"
      ) {
        this.position += 4;
        return { type: "OPERATOR", value: "LOAD" };
      }

      if (
        this.currentChar === "A" &&
        this.input.slice(this.position, this.position + 4) === "ADDI"
      ) {
        this.position += 4;
        return { type: "OPERATOR", value: "ADDI" };
      }

      if (
        this.currentChar === "O" &&
        this.input.slice(this.position, this.position + 2) === "OR"
      ) {
        this.position += 2;
        return { type: "OPERATOR", value: "OR" };
      }

      if (
        this.currentChar === "H" &&
        this.input.slice(this.position, this.position + 4) === "HALT"
      ) {
        this.position += 4;
        return { type: "OPERATOR", value: "HALT" };
      }

      if (
        this.currentChar === "R" &&
        this.input.slice(this.position, this.position + 5) === "RESET"
      ) {
        this.position += 5;
        return { type: "OPERATOR", value: "RESET" };
      }

      if (
        this.currentChar === "S" &&
        this.input.slice(this.position, this.position + 5) === "STORE"
      ) {
        this.position += 5;
        return { type: "OPERATOR", value: "STORE" };
      }

      if (
        this.currentChar === "A" &&
        this.input.slice(this.position, this.position + 3) === "AND"
      ) {
        this.position += 3;
        return { type: "OPERATOR", value: "AND" };
      }

      if (
        this.currentChar === "X" &&
        this.input.slice(this.position, this.position + 3) === "XOR"
      ) {
        this.position += 3;
        return { type: "OPERATOR", value: "XOR" };
      }

      if (
        this.currentChar === "M" &&
        this.input.sliice(this.position, this.position + 3) === "MUL"
      ) {
        this.position += 3;
        return { type: "OPERATOR", value: "MUL" };
      }

      if (
        this.input.currentChar === "R" &&
        this.input.slice(this.position, this.position + 3) === "ROR"
      ) {
        this.position += 3;
        return { type: "OPERATOR", value: "ROR" };
      }

      if (this.currentChar === ",") {
        this.position++;
        return { type: "COMMA", value: "," };
      }

      if (this.currentChar.startsWith("R")) {
        let reg = "";
        while (
          this.currentChar !== undefined &&
          /[a-zA-Z0-9]/.test(this.currentChar)
        ) {
          reg += this.currentChar;
          this.position++;
          this.currentChar = this.input[this.position];
        }
        return { type: "REGISTER", value: reg };
      }

      this.error();
    }
    return { type: "EOF", value: null };
  }

  skipWhitespace() {
    while (this.currentChar === " ") {
      this.advance();
    }
  }

  isDigit(char) {
    return /[0-9]/.test(char);
  }

  integer() {
    let result = "";
    while (this.currentChar !== undefined && this.isDigit(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return { type: "INTEGER", value: parseInt(result) };
  }

  error() {
    throw new Error(
      "Invalid character: " +
        this.currentChar +
        " ascii: " +
        this.currentChar.charCodeAt(0),
    );
  }

  advance() {
    this.position++;
    this.currentChar =
      this.position < this.input.length ? this.input[this.position] : undefined;
  }
}

class AssemblyParser {
  constructor(tokens, cpu) {
    this.tokens = tokens;
    this.instructions = [];
    this.currentInstruction;
    this.cpu = cpu;
  }

  parse() {
    for (let i = 0; i <= this.tokens.length; i++) {
      let token = this.tokens[i];
      if (token !== undefined) {
        if (token.type === "OPERATOR") {
          if (token.value === "LOAD") {
            let reg = this.tokens[i + 1];
            this.cpu.load(reg.value, this.tokens[i + 3].value);
            this.instructions.push({
              instruction: "LOAD",
              result: this.cpu.cpu_mem[reg.value],
            });
          }

          if (token.value === "STORE") {
            let reg = this.tokens[i + 1];
            this.cpu.store(reg.value, this.tokens[i + 3].value);
            this.instructions.push({
              instruction: "STORE",
              result: this.cpu.cpu_mem[reg.value],
            });
          }

          if (token.value === "ADDI") {
            let reg = this.tokens[i + 1];
            this.cpu.addi(
              reg.value,
              this.tokens[i + 3].value,
              this.tokens[i + 5].value,
            );
            this.instructions.push({
              instruction: "ADDI",
              result: this.cpu.cpu_mem[reg.value],
            });
          }

          if (token.value === "MUL") {
            let reg = this.tokens[i + 1];
            this.cpu.mul(
              reg.value,
              this.tokens[i + 3].value,
              this.tokens[i + 5].value,
            );
            this.instructions.push({
              instruction: "MUL",
              result: this.cpu.cpu_mem[reg.value],
            });
          }

          if (token.value === "AND") {
            let reg = this.tokens[i + 1];
            this.cpu.and(
              reg.value,
              this.tokens[i + 3].value,
              this.tokens[i + 5].value,
            );
            this.instructions.push({
              instruction: "AND",
              result: this.cpu.cpu_mem[reg.value],
            });
          }

          if (token.value === "OR") {
            let reg = this.tokens[i + 1];
            this.cpu.or(
              reg.value,
              this.tokens[i + 3].value,
              this.tokens[i + 5].value,
            );
            this.instructions.push({
              instruction: "OR",
              result: this.cpu.cpu_mem[reg.value],
            });
          }

          if (token.value === "XOR") {
            let reg = this.tokens[i + 1];
            this.cpu.xor(
              reg.value,
              this.tokens[i + 3].value,
              this.tokens[i + 5].value,
            );
            this.instructions.push({
              instruction: "XOR",
              result: this.cpu.cpu_mem[reg.value],
            });
          }

          if (token.value === "ROR") {
            let reg = this.tokens[i + 1];
            this.cpu.ror(reg.value, this.tokens[i + 3].value);
            this.instructions.push({
              instruction: "ROR",
              result: this.cpu.cpu_mem[reg.value],
            });
          }
        }
      }
    }
  }
}

export { AssemblyLexer, AssemblyParser };
