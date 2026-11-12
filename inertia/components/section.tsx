import { type ReactNode } from 'react'

/**
 * A group of content within a page, such as a group of form fields, with
 * an optional title and description. Stack several sections and they are
 * separated by a divider.
 */
export default function Section({
  title,
  titleLevel,
  description,
  children,
}: {
  title?: string
  titleLevel?: 2 | 3
  description?: ReactNode
  children: ReactNode
}) {
  const Title = titleLevel === 3 ? 'h3' : 'h2'

  return (
    <section className="section">
      {(title || description) && (
        <header className="section__header">
          {title && (
            <Title
              className={`section__title${titleLevel ? ` section__title--level-${titleLevel}` : ''}`}
            >
              {title}
            </Title>
          )}
          {description && <p className="section__description">{description}</p>}
        </header>
      )}
      <div className="section__body">{children}</div>
    </section>
  )
}
