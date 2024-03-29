const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const dedent = require('dedent');

const root = process.cwd();

const clearAndUpper = (text) => text.replace(/-/, '').toUpperCase();
const toPascalCase = (text) => text.replace(/(^\w|-\w)/g, clearAndUpper);

const getLayouts = () => {
  const layoutPath = path.join(root, 'src', 'layouts');
  return fs
    .readdirSync(layoutPath)
    .map((filename) => path.parse(filename).name)
    .filter((file) => file.toLowerCase().includes('post'));
};

const genFrontMatter = (answers) => {
  let d = new Date();
  const date = [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2),
  ].join('-');
  const tagArray = answers.tags.split(',');
  tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()));
  const tags = "'" + tagArray.join("','") + "'";

  let frontMatter = dedent`---
  title: '${answers.title ? answers.title : 'Untitled'}'
  date: '${date}'
  lastmod: '${date}'
  tags: [${answers.tags ? tags : ''}]
  draft: ${answers.draft === 'yes'}
  series: ${answers.series || `''`}
  summary: ${answers.summary ? answers.summary : `''`}
  images: []
  layout: ${toPascalCase(answers.layout)}
  `;

  frontMatter = frontMatter + '\n---';

  return frontMatter;
};

inquirer
  .prompt([
    {
      name: 'slug',
      message: 'Enter post slug:',
      type: 'input',
    },
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
    {
      name: 'summary',
      message: 'Enter post summary:',
      type: 'input',
    },
    {
      name: 'draft',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['no', 'yes'],
    },
    {
      name: 'series',
      message: 'Enter post series (or leave empty if no series): ',
      type: 'input',
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input',
    },
    {
      name: 'layout',
      message: 'Select layout',
      type: 'list',
      choices: getLayouts,
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const title = answers.title;
    const fileName = answers.slug
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/-+/g, '-');
    const frontMatter = genFrontMatter(answers);
    const tmp = fileName.split('/');
    const dirPath = path.join(root, 'data', 'blog', ...tmp.slice(0, -1));
    const file = tmp[tmp.length - 1];
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    const filePath = `${dirPath}/${file || 'untitled'}.${
      answers.extension || 'md'
    }`;
    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Blog post generated successfully at ${filePath}`);
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.error(error);
      console.log('Something went wrong, sorry!');
    }
  });
