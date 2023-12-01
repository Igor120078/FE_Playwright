export class PropertiesManager {
  public static getProperty(propertyName: string): string {
    const propertyValue = process.env[propertyName]
    if (propertyValue === undefined) {
      throw Error(
        'Property "' + propertyName + '" is not defined for environment "' + process.env.TEST_ENVIRONMENT + '"!'
      )
    }
    return propertyValue
  }
}
