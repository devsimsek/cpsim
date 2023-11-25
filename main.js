import { Cpu } from "./cpu.js";
import { AssemblyLexer, AssemblyParser } from "./asm.js";

let cpu = new Cpu();
cpu.mem[0o0] = "1001";
cpu.mem[0o1] = "0010";
console.info(cpu.mem);
console.info(cpu.cpu_mem);
let lexer = new AssemblyLexer(
  "LOAD R1, 00\nLOAD R2, 01\nADDI R0, R1, R2\nSTORE R0, 00\nAND R0, R1, R2\nOR R3, R1, R2\nROR R3, 2\nXOR R4, R1, R2",
);
let output = lexer.tokenize();
let p = new AssemblyParser(output, cpu);
p.parse();
console.info(p.instructions);
console.info(cpu.mem);
console.info(cpu.cpu_mem);
