export class SectionModel {
    public section_name!: string;
    public section_uuid!: string;
    public subsections!: SectionModel[];

    public static gen_uuid = function(){
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
  }