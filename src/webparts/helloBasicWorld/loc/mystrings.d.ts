declare interface IHelloBasicWorldWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  PropertyPanePage1_Description: string;
  BasicGroupName1: string;
  BasicGroupName2: string;

  PropertyPanePage2_Description: string;  
  AdvancedGroupName1: string;
  AdvancedGroupName2: string;

  WP_prop_label_text: string;

  WP_prop_text_label: string;
  WP_prop_text_description: string;
  WP_prop_text_placeholder: string;

  WP_prop_multiline_label: string;
  WP_prop_multiline_description: string;
  WP_prop_multiline_placeholder: string;

  WP_prop_checkbox_label_text: string;

  WP_prop_checkbox_text: string;

  WP_prop_link_label_text: string;

  WP_prop_link_text: string;
  WP_prop_link_popupWindowProps_title: string;

  WP_prop_toggle_label: string;
  WP_prop_toggle_onText: string;
  WP_prop_toggle_offText: string;

  WP_prop_slider_label: string;

  WP_prop_dropdown_label: string;

  WP_prop_choicegroup: string;
}

declare module 'HelloBasicWorldWebPartStrings' {
  const strings: IHelloBasicWorldWebPartStrings;
  export = strings;
}
