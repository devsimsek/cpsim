class Cpu {
  constructor(cpu_mem = [], mem = []) {
    this.cpu_mem =
      cpu_mem.length <= 0
        ? {
            R0: "",
            R1: "",
            R2: "",
            R3: "",
            R4: "",
            R5: "",
            R6: "",
            R7: "",
            R8: "",
            R9: "",
            RA: "",
            RB: "",
            RC: "",
            RD: "",
            RE: "",
            RF: "",
          }
        : cpu_mem;
    this.mem = mem.length <= 0 ? [] : mem;
  }

  reset() {
    this.cpu_mem = {
      R0: "",
      R1: "",
      R2: "",
      R3: "",
      R4: "",
      R5: "",
      R6: "",
      R7: "",
      R8: "",
      R9: "",
      RA: "",
      RB: "",
      RC: "",
      RD: "",
      RE: "",
      RF: "",
    };
    this.mem = [];
  }

  load(register, address) {
    this.cpu_mem[register] = this.mem[address].padStart(4, "0");
  }

  store(register, address) {
    this.mem[address] = this.cpu_mem[register];
  }

  addi(register, address, address2) {
    const bin1 = this.cpu_mem[address].padStart(4, "0");
    const bin2 = this.cpu_mem[address2].padStart(4, "0");
    let result = [];
    let carry = 0;
    for (let i = 3; i >= 0; i--) {
      const bit1 = parseInt(bin1[i]);
      const bit2 = parseInt(bin2[i]);
      const sum = bit1 + bit2 + carry;
      result.unshift(sum % 2);
      carry = sum > 1 ? 1 : 0;
    }
    if (carry) result.unshift(carry);

    this.cpu_mem[register] = result.join("").slice(-4);
  }

  mul(register, multiplicand, multiplier) {
    for (let i = 0; i <= multiplier; i++) {
      this.addi(register, register, multiplicand);
    }
  }

  // not yet implemented
  sub() {}

  // not yet implemented
  div() {}

  // not yet implemented
  not() {}

  and(register, address, address2) {
    const bin1 = this.cpu_mem[address];
    const bin2 = this.cpu_mem[address2];
    let result = "";

    for (let i = 0; i < 4; i++) {
      const bit1 = parseInt(bin1[i]);
      const bit2 = parseInt(bin2[i]);
      result += bit1 & bit2;
    }

    this.cpu_mem[register] = result;
  }

  or(register, address, address2) {
    const bin1 = this.cpu_mem[address];
    const bin2 = this.cpu_mem[address2];
    let result = "";

    for (let i = 0; i < 4; i++) {
      const bit1 = parseInt(bin1[i]);
      const bit2 = parseInt(bin2[i]);
      result += bit1 | bit2;
    }

    this.cpu_mem[register] = result;
  }

  // not yet implemented
  nor() {}

  xor(register, address, address2) {
    const bin1 = this.cpu_mem[address];
    const bin2 = this.cpu_mem[address2];
    let result = "";

    for (let i = 0; i < 4; i++) {
      const bit1 = parseInt(bin1[i]);
      const bit2 = parseInt(bin2[i]);
      result += bit1 ^ bit2;
    }

    this.cpu_mem[register] = result;
  }

  // not yet implemented
  xnor() {}

  // not yet implemented
  nand() {}

  ror(register, turn) {
    let binaryArray = Array.from(this.cpu_mem[register], (char) =>
      (char.charCodeAt(0) & 0b1111).toString(2).padStart(4, "0"),
    );
    let text = binaryArray
      .map((binary) => String.fromCharCode(parseInt(binary, 2)))
      .join("");
    let binArrayNew = text
      .split("")
      .flatMap((char, i, arr) => [arr[arr.length - turn + i], char]);
    this.cpu_mem[register] = binArrayNew.join("");
  }
}

export { Cpu };
export default { Cpu };
