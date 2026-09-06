import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (!text) {
      return null
    }

    const segments: (string | JSX.Element)[] = []

    // Authors
    const authors = fileData.frontmatter?.authors
    const readingTimeValue = fileData.frontmatter?.readingTime
    const journal = fileData.frontmatter?.journal
    const impactFactor = fileData.frontmatter?.impactFactor
    const resource = fileData.frontmatter?.resource
    const authorList = Array.isArray(authors)
      ? authors.join(", ")
      : authors

    if (authors) {
      const authorList = Array.isArray(authors) ? authors.join(", ") : authors

      segments.push(
        <span class="content-meta-authors">
          <strong>Authors:</strong> {authorList}
        </span>,
      )
    }

    // Date
    if (fileData.dates) {
      segments.push(
        <span>
          {formatDate(getDate(cfg, fileData)!, cfg.locale)}
        </span>,
      )
    }

    // Reading time
    if (options.showReadingTime) {
      const manualReadingTime = fileData.frontmatter?.readingTime

      if (manualReadingTime) {
        segments.push(
          <span>
            Reading time: {manualReadingTime}
          </span>,
        )
      }
    }

    // Manuscript
    const manuscript = fileData.frontmatter?.manuscript_link
    const segmentsElements = segments.map((segment) => segment)

    return (
      <div class={classNames(displayClass, "content-meta")}>

        {authorList && (
          <div class="content-meta-authors">
            <strong>Authors:</strong> {authorList}
          </div>
        )}

        {fileData.dates && (
          <div class="content-meta-date">
            <strong>Date:</strong>{" "}
            {formatDate(getDate(cfg, fileData)!, cfg.locale)}
          </div>
        )}

        {journal && (
          <div class="content-meta-journal">
            <strong>Journal:</strong> {journal}
          </div>
        )}

        {impactFactor && (
          <div class="content-meta-impact-factor">
            <strong>Impact Factor:</strong> {impactFactor}
          </div>
        )}

        {resource && (<div class="content-meta-resource">
          <a
            href={resource}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to Resource ↗
          </a>
        </div>)}

        {readingTimeValue && (
          <div class="content-meta-reading-time">
            <strong>Reading time:</strong> {readingTimeValue}
          </div>
        )}

        {manuscript && (
          <div class="content-meta-manuscript">
            <a
              href={manuscript}
              target="_blank"
              rel="noopener noreferrer"
            >
              Manuscript Link ↗
            </a>
          </div>
        )}

      </div>
    )
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
