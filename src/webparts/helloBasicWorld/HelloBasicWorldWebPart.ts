import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneLabel,                //label
  PropertyPaneTextField,            //textbox
  PropertyPaneCheckbox,             //checkbox
  PropertyPaneLink,                 //hyperlink
  PropertyPaneSlider,               //slider
  PropertyPaneToggle,               //toggle switch
  PropertyPaneHorizontalRule,       //horizontal line
  PropertyPaneChoiceGroup,          //radio
  PropertyPaneDropdown,             //dropdown
  PropertyPaneDropdownOptionType,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneFieldType,
  PropertyPaneDynamicField,
  PropertyPaneDynamicFieldSet
} from "@microsoft/sp-webpart-base";

import { escape } from "@microsoft/sp-lodash-subset";

import styles from "./HelloBasicWorldWebPart.module.scss";
import * as strings from "HelloBasicWorldWebPartStrings";
import { IHelloBasicWorldWebPartProps } from "./IHelloBasicWorldWebPartProps";
import { Constants } from "../../Utilities/Constants";

export default class HelloBasicWorldWebPart extends BaseClientSideWebPart<IHelloBasicWorldWebPartProps> {

  public render(): void {
    console.log(this.properties.wp_prop_link);
    
    this.domElement.innerHTML = `
      <div class="${styles.helloBasicWorld}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <span class="${styles.title}">Welcome to SharePoint!</span>
            <p class="${styles.subTitle}">Customize SharePoint experiences using Web Parts.</p>
          </div>

          <div class="${styles.row}">
            <div>
              <span class="${styles.title}">Basic Settings Page1</span>
            </div>
            <div class="${styles.column}">
              <span class="${styles.subTitle}">Basic Group Name1</span>
              <p class="${styles.description}">Name: ${escape(this.properties.wp_prop_text)}</p>
              <p class="${styles.description}">Details: ${escape(this.properties.wp_prop_multiline)}</p>
            </div>
            <div>
              <span class="${styles.subTitle}">Basic Group Name2</span>              
              <p class="${styles.description}">Select checkbox value: ${escape(this.properties.wp_prop_checkbox)}</p>
              <p class="${styles.description}">My Blog: ${ this.properties.wp_prop_link }</p>
            </div>
          </div>

          <div class="${styles.row}">
            <div>
              <span class="${styles.title}">Advanced Settings Page2</span>
            </div>
            <div class="${styles.column}">
              <span class="${styles.subTitle}">Advanced Group Name1</span>              
              <p class="${styles.description}">Enable or Disabled: ${this.properties.wp_prop_toggle}</p>
              <p class="${styles.description}">Slider value: ${escape(this.properties.wp_prop_slider)}</p>
            </div>
            <div>
              <span class="${styles.subTitle}">Advanced Group Name2</span>              
              <p class="${styles.description}">Choose color: ${escape(this.properties.wp_prop_dropdown)}</p>
              <p class="${styles.description}">File type: ${escape(this.properties.wp_prop_choicegroup)}</p>
            </div>
          </div>

        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  // protected get disableReactivePropertyChanges(): boolean{
  //   return true;
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPanePage1_Description
          },
          groups: [
            {
              groupName: strings.BasicGroupName1,
              groupFields: [
                //PropertyPaneHorizontalRule(),
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // }),
                PropertyPaneLabel(Constants.WP_Prop_Label, {
                  text: strings.WP_prop_label_text,
                  required: true
                }),
                // PropertyPaneLabel("wp_prop_text_label", {
                //   text: "please enter",
                //   required: true
                // }),
                PropertyPaneTextField(Constants.WP_Prop_Text, {
                  label: strings.WP_prop_text_label,
                  multiline: false,
                  resizable: false,
                  maxLength: 50,
                  onGetErrorMessage: this.validateTextBoxMethod.bind(this),
                  //errorMessage: 'error message',   //not sure about the purpose of this
                  deferredValidationTime: 500,
                  description: strings.WP_prop_text_description,
                  placeholder: strings.WP_prop_text_placeholder
                }),
                PropertyPaneTextField(Constants.WP_Prop_Multiline, {
                  label: strings.WP_prop_multiline_label,
                  multiline: true,
                  resizable: true,
                  maxLength: 120,
                  onGetErrorMessage: this.validateTextBoxMethod.bind(this),
                  //errorMessage: 'error message',   //not sure about the purpose of this
                  deferredValidationTime: 500,
                  description: strings.WP_prop_multiline_description,
                  placeholder: strings.WP_prop_multiline_placeholder
                }),
                PropertyPaneHorizontalRule()
              ]
            },
            {
              groupName: strings.BasicGroupName2,
              groupFields: [
                //PropertyPaneHorizontalRule(),
                PropertyPaneLabel(Constants.WP_Prop_Checkbox_Label, {
                  text: strings.WP_prop_checkbox_label_text
                }),
                PropertyPaneCheckbox(Constants.WP_Prop_Checkbox, {
                  text: strings.WP_prop_checkbox_text,
                  checked: true,
                  disabled: false
                }),
                PropertyPaneLabel(Constants.WP_Prop_Link_Label, {
                  text: strings.WP_prop_link_label_text
                }),
                PropertyPaneLink(Constants.WP_Prop_Link, {
                  text: strings.WP_prop_link_text,
                  href: Constants.WP_Prop_Link_Href,
                  target: Constants.WP_Prop_Link_Target,
                  disabled: false,
                  popupWindowProps: {
                    height: 400,
                    width: 400,
                    positionWindowPosition: 2,
                    title: strings.WP_prop_link_popupWindowProps_title
                  }
                }),
              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPanePage2_Description
          },
          groups: [
            {
              groupName: strings.AdvancedGroupName1,
              groupFields: [
                PropertyPaneToggle(Constants.WP_Prop_Toggle, {
                  label: strings.WP_prop_toggle_label,
                  key: Constants.WP_Prop_Toggle_Key,
                  onText: strings.WP_prop_toggle_onText,
                  offText: strings.WP_prop_toggle_offText,
                  disabled: false
                }),
                PropertyPaneSlider(Constants.WP_Prop_Slider, {
                  label: strings.WP_prop_slider_label,
                  min: 1,
                  max: 10,
                  step: 1,
                  showValue: true,
                  value: 5,
                  disabled: false
                }),
                PropertyPaneHorizontalRule()
              ]
            },
            {
              groupName: strings.AdvancedGroupName2,
              groupFields: [
                //PropertyPaneHorizontalRule(),
                PropertyPaneDropdown(Constants.WP_Prop_Dropdown, {
                  label: strings.WP_prop_dropdown_label,
                  disabled: false,
                  options: [  // dropdown options will populated dynamically in real scenarios
                    { key: "Red", text: "Red", index: 0 },
                    { key: "Blue", text: "Blue", index: 1 },
                    { key: "Black", text: "Black", index: 2 },
                    { key: "Green", text: "Green", index: 3 }
                  ]
                }),
                PropertyPaneChoiceGroup(Constants.WP_Prop_Choicegroup, {
                  // label: "Choice Group",
                  // options: [
                  //   { key: "a", text: "a" },
                  //   { key: "b", text: "b", checked: true, },
                  //   { key: "c", text: "c", disabled: true },
                  //   { key: "d", text: "d" }
                  // ]
                  label: strings.WP_prop_choicegroup,
                  options: [
                    {
                      key: "Word", text: "Word", checked:true,
                      imageSrc: Constants.WP_Prop_Choicegroup_Option_Img_Word,
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: Constants.WP_Prop_Choicegroup_Option_Img_Word
                    },
                    {
                      key: "Excel", text: "Excel",
                      imageSrc: Constants.WP_Prop_Choicegroup_Option_Img_Excel,
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: Constants.WP_Prop_Choicegroup_Option_Img_Excel
                    },
                    {
                      key: "PowerPoint", text: "PowerPoint",
                      imageSrc: Constants.WP_Prop_Choicegroup_Option_Img_PowerPoint,
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: Constants.WP_Prop_Choicegroup_Option_Img_PowerPoint
                    },
                    {
                      key: "OneNote", text: "OneNote", disabled: true,
                      imageSrc: Constants.WP_Prop_Choicegroup_Option_Img_OneNote,
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: Constants.WP_Prop_Choicegroup_Option_Img_OneNote
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private validateTextBoxMethod(value: string): string {
    if (value === null || value.trim().length === 0) {
      return "Provide the data";
    }

    return "";
  }
}
