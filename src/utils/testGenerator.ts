import { generateName } from './nameGenerator';

// Simulate runs
const testRuns = 20;

console.log(`Running ${testRuns} test generations...\n`);

for (let i = 0; i < testRuns; i++) {
    const result = generateName({
        gender: Math.random() > 0.5 ? 'male' : 'female',
        vibe: 'wisdom',
        birthYear: 1990 + Math.floor(Math.random() * 30)
    });

    console.log(`[${i + 1}] ${result.fullNameKr} (${result.fullNameEn})`);
    console.log(`    Meaning: ${result.surnameMeaning} ${result.firstNameMeaning}`);
    console.log(`    Hanja: ${result.hanja}`);
    console.log(`    Interpretation: ${result.fullInterpretation}`);
    console.log('---');
}
