export type TodoType = {
  name: string
  description: string
  creationDate: string
}

export class TodoTypeBuilder {
  private name: string = ''
  private description: string = ''
  private creationDate: string = ''

  public static newInstance(): TodoTypeBuilder {
    return new TodoTypeBuilder()
  }

  setName(name: string): TodoTypeBuilder {
    this.name = name
    return this
  }

  setDescription(description: string): TodoTypeBuilder {
    this.description = description
    return this
  }

  setCreationDate(creationDate: string): TodoTypeBuilder {
    this.creationDate = creationDate
    return this
  }

  build(): TodoType {
    return { name: this.name, description: this.description, creationDate: this.creationDate }
  }
}
