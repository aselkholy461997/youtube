import { Component, Vue } from 'vue-property-decorator';

@Component
class HTMLEntitiesMixin extends Vue {
  public translateHTMLEntities(text: string) {
    return text.replace(/&quot;/gi, '"').replace(/&#39;/gi, "'");
  }
}
export default HTMLEntitiesMixin;
