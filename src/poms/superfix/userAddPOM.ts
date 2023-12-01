import { Page } from '@playwright/test'
import { InputInterface } from '../../components/interfaces/inputInterface'
import { POM } from '../pom'
import { ComponentFactory } from '../../components/factory/componentFactory'
import { ButtonInterface } from '../../components/interfaces/buttonInterface'
import { ComboboxInterface } from '../../components/interfaces/comboboxInterface'
import { CheckboxInterface } from '../../components/interfaces/checkboxInterface'
import { RadioGroupInterface } from '../../components/interfaces/radioGroupInterface'

export default class UsersAddPOM extends POM {
  private displayedName_input: InputInterface
  private firstName_input: InputInterface
  private sureName_input: InputInterface
  private companyName_input: InputInterface
  private userEmail_input: InputInterface
  private userPhone_input: InputInterface
  private userAddAdress_input: ButtonInterface
  private userQualifications_combobox: ComboboxInterface
  private userTag_combobox: ComboboxInterface
  private workWeekMonday_button: ButtonInterface
  private workWeekTuesday_button: ButtonInterface
  private workWeekWednesday_button: ButtonInterface
  private workWeekThursday_button: ButtonInterface
  private workWeekFriday_button: ButtonInterface
  private workWeekSaturday_button: ButtonInterface
  private workWeekSunday_button: ButtonInterface
  private orderGroupHvac_checkbox: CheckboxInterface
  private orderGroupFve_checkbox: CheckboxInterface
  private employeeIco_input: InputInterface
  private employeeDic_input: InputInterface
  private externalistState_combobox: ComboboxInterface
  private selectOrganizations_combobox: ComboboxInterface
  private selectOrganization_combobox: ComboboxInterface
  private employmentType_radiogroup: RadioGroupInterface
  private workHoursMonth_input: InputInterface
  private bankAccount_input: InputInterface
  private bankCode_input: InputInterface
  private employeeWillToCommuteTitle_combobox: ComboboxInterface
  private googleCalendarID_input: InputInterface
  private employeeManagers_combobox: ComboboxInterface
  private employeeGroupName_combobox: ComboboxInterface
  //private newEmployeeRoles_combobox: ComboboxInterface
  private newEmployeeWarehouse_combobox: ComboboxInterface
  private employeeNote_input: InputInterface
  private instalationWorkersCertificate_input: ButtonInterface
  private instalationWorkersCertificateValidUntil_input: ButtonInterface
  private instalationWorkersCertificateType_input: ComboboxInterface
  private instalationWorkersCertificateLabel_button: ButtonInterface
  private instalationWorkersCertificateDelete_button: ButtonInterface
  private editSave_button: ButtonInterface

  constructor(page: Page) {
    super(page)

    this.displayedName_input = ComponentFactory.createInput()
      .freeTextInput()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.displayedName'))

    this.firstName_input = ComponentFactory.createInput()
      .freeTextInput()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.firstname'))

    this.sureName_input = ComponentFactory.createInput()
      .freeTextInput()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.surname'))

    this.companyName_input = ComponentFactory.createInput()
      .freeTextInput()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.companyName'))

    this.userEmail_input = ComponentFactory.createInput()
      .freeTextInput()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.email'))

    this.userPhone_input = ComponentFactory.createInput()
      .freeTextInput()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.phone'))

    this.userAddAdress_input = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.addAddress'))

    this.userQualifications_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('installationWorkers.detail.edit.qualifications.placeholder').first())
      .setVisible(true)

    this.userTag_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('codebook.EMPLOYEE_TAG.placeholder'))
      .setVisible(true)

    this.workWeekMonday_button = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByTestId('workDaySet.MONDAY'))

    this.workWeekTuesday_button = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByTestId('workDaySet.TUESDAY'))

    this.workWeekWednesday_button = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByTestId('workDaySet.WEDNESDAY'))

    this.workWeekThursday_button = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByTestId('workDaySet.THURSDAY'))

    this.workWeekFriday_button = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByTestId('workDaySet.FRIDAY'))

    this.workWeekSaturday_button = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByTestId('workDaySet.SATURDAY'))

    this.workWeekSunday_button = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByTestId('workDaySet.SUNDAY'))

    this.orderGroupHvac_checkbox = ComponentFactory.createCheckbox()
      .checkbox()
      .setLocator(this.page.getByText('ORDER_GROUP.HVAC'))
      .setVisible(true)

    this.orderGroupFve_checkbox = ComponentFactory.createCheckbox()
      .checkbox()
      .setLocator(this.page.getByText('ORDER_GROUP.FVE'))
      .setVisible(true)

    this.employeeIco_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.ico'))
      .setVisible(true)

    this.employeeDic_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.dic'))
      .setVisible(true)

    this.externalistState_combobox = ComponentFactory.createCombobox()
      .wuiSingleSelectCombobox()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.externalistState').first())
      .setVisible(true)

    this.selectOrganizations_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.selectOrganizations').nth(1))
      .setVisible(true)

    this.selectOrganization_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.selectOrganization').first())
      .setVisible(true)

    this.employmentType_radiogroup = ComponentFactory.createRadioGroup()
      .radioGroup()
      .addRadioOption(
        ComponentFactory.createRadioOption()
          .radioOption()
          .setOptionName('typeHpp')
          .setLocator(this.page.getByText('EMPLOYMENT_TYPE.HPP'))
          .setVisible(true)
      )
      .addRadioOption(
        ComponentFactory.createRadioOption()
          .radioOption()
          .setOptionName('typeIco')
          .setLocator(this.page.getByText('EMPLOYMENT_TYPE.ICO'))
          .setVisible(true)
      )
      .addRadioOption(
        ComponentFactory.createRadioOption()
          .radioOption()
          .setOptionName('typeExt')
          .setLocator(this.page.getByText('EMPLOYMENT_TYPE.EXT'))
          .setVisible(true)
      )
    //this.employmentType_radiogroup.selectOptionByName('typeIco')

    this.workHoursMonth_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.workHoursMonth'))
      .setVisible(true)

    this.bankAccount_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.bankAccount'))
      .setVisible(true)

    this.bankCode_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.bankCode'))
      .setVisible(true)

    this.employeeWillToCommuteTitle_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('codebook.EMPLOYEE_WILL_TO_COMMUTE.title'))
      .setVisible(true)

    this.googleCalendarID_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.googleCalendarID'))
      .setVisible(true)

    this.employeeManagers_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.managers'))
      .setVisible(true)

    this.employeeGroupName_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.groupName').first())
      .setVisible(true)

    // this.newEmployeeRoles_combobox = ComponentFactory.createCombobox()
    //   .multiselectCombobox()
    //   .setLocator(this.page.getByText('users.newEmployee.roles'))
    //   .setVisible(true)

    this.newEmployeeWarehouse_combobox = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setLocator(this.page.getByText('users.newEmployee.warehouse').first())
      .setVisible(true)

    this.employeeNote_input = ComponentFactory.createInput()
      .freeTextInput()
      .setLocator(this.page.getByText('installationWorkers.detail.employee.employeeNote'))
      .setVisible(true)

    this.instalationWorkersCertificate_input = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.certificate.new'))

    this.instalationWorkersCertificateValidUntil_input = ComponentFactory.createButton()
      .button()
      .setVisible(false)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.certificate.validUntil.label'))

    this.instalationWorkersCertificateType_input = ComponentFactory.createCombobox()
      .wuiSimpleMultiselectCombobox()
      .setVisible(false)
      .setLocator(this.page.getByText('employee.certificate.type'))

    this.instalationWorkersCertificateLabel_button = ComponentFactory.createButton()
      .button()
      .setVisible(false)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.certificate.label'))

    this.instalationWorkersCertificateDelete_button = ComponentFactory.createButton()
      .button()
      .setVisible(false)
      .setLocator(this.page.getByText('installationWorkers.detail.employee.certificate.delete'))

    this.editSave_button = ComponentFactory.createButton()
      .button()
      .setVisible(true)
      .setLocator(this.page.getByText('installationWorkers.detail.edit.save.button'))
  }

  public navigate(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public goBack(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async fillForm(inputData: {
    displayedName?: string
    firstName_input?: string
    sureName_input?: string
    companyName_input?: string
    userEmail_input?: string
    userPhone_input?: string
    employeeIco_input?: string
    employeeDic_input?: string
    workHoursMonth_input?: string
    bankAccount_input?: string
    bankCode_input?: string
    googleCalendarID_input?: string
    employeeNote_input?: string
    organization?: string
  }): Promise<void> {
    if (inputData.displayedName) {
      await this.displayedName_input.sendTextToInput(inputData.displayedName)
    }
    if (inputData.firstName_input) {
      await this.firstName_input.sendTextToInput(inputData.firstName_input)
    }
    if (inputData.sureName_input) {
      await this.sureName_input.sendTextToInput(inputData.sureName_input)
    }
    if (inputData.companyName_input) {
      await this.companyName_input.sendTextToInput(inputData.companyName_input)
    }
    if (inputData.userEmail_input) {
      await this.userEmail_input.sendTextToInput(inputData.userEmail_input)
    }
    if (inputData.userPhone_input) {
      await this.userPhone_input.sendTextToInput(inputData.userPhone_input)
    }
    if (inputData.employeeIco_input) {
      await this.employeeIco_input.sendTextToInput(inputData.employeeIco_input)
    }
    if (inputData.employeeDic_input) {
      await this.employeeDic_input.sendTextToInput(inputData.employeeDic_input)
    }
    if (inputData.workHoursMonth_input) {
      await this.workHoursMonth_input.sendTextToInput(inputData.workHoursMonth_input)
    }
    if (inputData.bankAccount_input) {
      await this.bankAccount_input.sendTextToInput(inputData.bankAccount_input)
    }
    if (inputData.bankCode_input) {
      await this.bankCode_input.sendTextToInput(inputData.bankCode_input)
    }
    if (inputData.googleCalendarID_input) {
      await this.googleCalendarID_input.sendTextToInput(inputData.googleCalendarID_input)
    }
    if (inputData.employeeNote_input) {
      await this.employeeNote_input.sendTextToInput(inputData.employeeNote_input)
    }
    if (inputData.organization) {
      await this.selectOrganization_combobox.selectOption(inputData.organization)
    }
  }
}
