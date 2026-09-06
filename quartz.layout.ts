import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [Component.Breadcrumbs()],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/aaqibb13",
      Twitter: "https://x.com/reallifeglonk",
      LinkedIn: "https://www.linkedin.com/in/aaqibbashir",
      ORCID: "https://orcid.org/0000-0002-2656-2883",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.Explorer({
          title:"Explorer",
          folderClickBehavior: "link",
          folderDefaultState: "collapsed",
          useSavedState: false,
          mapFn: (node) => {
            if (node.displayName.toLowerCase() == "write ups"){
                node.displayName = "Write Ups"
            }else if(node.displayName.toLowerCase() == "research"){
                node.displayName = "Research"
            }
          },
          filterFn: (node) => {
            const omit = new Set(["oss", "tags", "hosting","projects"])
            return !omit.has(node.displayName.toLowerCase())
          },
          order: ["filter", "map", "sort"],
        }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [
    // Component.Graph(),
    // Component.DesktopOnly(Component.TableOfContents()),
    // Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    // Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
