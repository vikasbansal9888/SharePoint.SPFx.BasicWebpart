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

export default class HelloBasicWorldWebPart extends BaseClientSideWebPart<
  IHelloBasicWorldWebPartProps
> {
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.helloBasicWorld}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">Welcome to SharePoint!</span>
              <p class="${
                styles.subTitle
              }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${styles.description}">${escape(
      this.properties.description
    )}</p>
              <p class="${styles.description}">${escape(
      this.properties.wp_prop_text
    )}</p>
              <p class="${styles.description}">${escape(
      this.properties.wp_prop_multiline
    )}</p>
              <a href="" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneHorizontalRule(),
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // }),
                PropertyPaneLabel("wp_prop_label", {
                  text: "please enter the mandatory fields",
                  required: true
                }),
                // PropertyPaneLabel("wp_prop_text_label", {
                //   text: "please enter",
                //   required: true
                // }),
                PropertyPaneTextField("wp_prop_text", {
                  label: "name2",
                  multiline: false,
                  resizable: false,
                  maxLength: 50,
                  onGetErrorMessage: this.validateTextBoxMethod.bind(this),
                  //errorMessage: 'error msg2',
                  deferredValidationTime: 1000,
                  description: "this is textbox2",
                  placeholder: "this is placeholder text2"
                }),
                // PropertyPaneLabel("wp_prop_multiline_label", {
                //   text: "please enter",
                //   required: true
                // }),
                PropertyPaneTextField("wp_prop_multiline", {
                  label: "multi line",
                  multiline: true,
                  resizable: true,
                  maxLength: 120,
                  onGetErrorMessage: this.validateTextBoxMethod.bind(this),
                  //errorMessage: 'error msg2',
                  deferredValidationTime: 1000,
                  description: "this is textbox2",
                  placeholder: "this is placeholder text2"
                }),
                PropertyPaneHorizontalRule()
              ]
            },
            {
              groupName: "Page1 group2",
              groupFields: [
                //PropertyPaneHorizontalRule(),
                PropertyPaneCheckbox("wp_prop_checkbox", {
                  text: "Yes/No",
                  checked: true,
                  disabled: false
                }),                
                PropertyPaneLabel("wp_prop_link_label", {
                  text: "My Blog"
                }),
                PropertyPaneLink("wp_prop_link", {
                  text: "Blogs 2 Share",
                  href: "https://blogs2share.blogspot.com/",
                  target: "_blank",
                  disabled: false,
                  popupWindowProps: {
                    height: 400,
                    width: 400,
                    positionWindowPosition: 2,
                    title: "Vikas"
                  }
                }),
              ]
            }
          ]
        },
        {
          header: {
            description: "abc"
          },
          groups: [
            {
              groupName: "Page2 group1",
              groupFields: [
                PropertyPaneHorizontalRule(),
                PropertyPaneToggle("wp_prop_toggle", {
                  label: "Enable or Disable?",
                  key: "toBeToggle",
                  onText: "Enabled",
                  offText: "Disabled",
                  disabled: false
                }),
                PropertyPaneSlider("wp_prop_slider", {
                  label: "Slide to select value",
                  min: 1,
                  max: 10,
                  step: 1,
                  showValue: true,
                  value: 5,
                  disabled: false
                })
              ]
            },
            {
              groupName: "Page2 group2",
              groupFields: [
                //PropertyPaneHorizontalRule(),
                PropertyPaneDropdown("wp_prop_dropdown", {
                  label: "Choose qualification",
                  disabled: false,
                  options: [
                    { key: "Red", text: "Red", index: 0 },
                    { key: "Blue", text: "Blue", index: 1 },
                    { key: "Black", text: "Black", index: 2 },
                    { key: "Green", text: "Green", index: 3 }
                  ]
                }),
                PropertyPaneChoiceGroup("wp_prop_choicegroup", {
                  // label: "Ch GRP",
                  // options: [
                  //   { key: "1a", text: "1a" },
                  //   { key: "1b", text: "1b", checked: true, },
                  //   { key: "1c", text: "1c", disabled: true },
                  //   { key: "1d", text: "1d" }
                  // ]
                  label: 'File type:',
                  options: [
                    { key: 'Word', text: 'Word', checked:true,
                      imageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/docx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/docx_32x1.png'
                    },
                    { key: 'Excel', text: 'Excel',
                      imageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png'
                    },
                    { key: 'PowerPoint', text: 'PowerPoint',
                      imageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/pptx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/pptx_32x1.png'
                    },
                    { key: 'OneNote', text: 'OneNote',
                      imageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/one_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/one_32x1.png'
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
      return "Provide a description";
    }

    return "";
  }
}
