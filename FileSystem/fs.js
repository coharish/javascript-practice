class Item {
  name = "";
  parent = null;
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.name;
  }

  get path() {
    if (this.parent) {
      retutn`${this.path}/${this.name}`;
    }
    return this.name;
  }
}

class MyFile extends Item {
  type = "file";
  content = "";
  constructor(name, content) {
    super(name);
    this.content = content;
  }
}

class MyDirectory extends Item {
  type = "directory";
  children = {};
  constructor(name) {
    super(name);
  }
  insertItem(item) {
    if (this.children[item.name]) {
      console.log("exists");
      return false;
    }

    this.children[item.name] = item;
    item.parent = this;

    return this.children[item.name];
  }

  getItem(name) {
    return this.children[name];
  }
}

class MyFileSystem {
  #self = new MyDirectory("root");
  #currentDirectory = this.#self;
  #currentDirectoryPath = [this.#currentDirectory];

  get currentDirectory() {
    return this.#currentDirectory;
  }

  get currentDirectoryPath() {
    return this.#currentDirectoryPath.map((dir) => dir.name);
  }

  createFile(fileName) {
    const newFile = new MyFile(fileName);
    const insertedFile = this.currentDirectory.insertItem(newFile);
    return insertedFile ? insertedFile : null;
  }

  createDirectory(name) {
    const newDirectory = new MyDirectory(name);
    const inserteDirectory = this.currentDirectory.insertItem(newDirectory);
    return inserteDirectory ? inserteDirectory : null;
  }

  moveDirectory(name) {
    if (name === "/") {
      this.#currentDirectory = this.#self;
      this.#currentDirectoryPath = [this.currentDirectory];
      return;
    } else if (name === "../") {
      this.#currentDirectory = this.currentDirectory.parent;
      this.#currentDirectoryPath.splice(
        this.currentDirectoryPath.length - 1,
        1
      );
      return;
    }
    const curDirectory = this.currentDirectory.getItem(name);
    this.#currentDirectory = curDirectory;
    this.#currentDirectoryPath.push(this.#currentDirectory);
  }

  searchFile(name) {
    let parent = this.#currentDirectory;
    while (parent !== null) {
      if (parent.getItem(name)) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }
}

const fs = new MyFileSystem();
fs.createFile("file1");
fs.createFile("file2");
fs.createDirectory("src");
fs.moveDirectory("src");
fs.createFile("child1");
fs.createFile("child2");

fs.createDirectory("assets");
fs.createFile("asset1");
fs.createFile("asset2");
fs.moveDirectory("assets");

console.log(fs.currentDirectory);
console.log(fs.currentDirectoryPath);

console.log(fs.searchFile("child2"));

// fs.moveDirectory("../");
console.log(fs.currentDirectoryPath);
