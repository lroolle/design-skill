---
id: album-leaf
name: Album Leaf with Colophons (册页 题跋)
tier: atmosphere
modes: [experience, persuade, read]
families: [paper, silk, ink]
rating: 2
grain: [view, region, flow]
platforms: [web, ios, android]
origin: the Song and later album leaf (ceye) format: a small painting or calligraphy on silk or paper mounted in a folding album, a large measure of empty ground, collectors' seals in red accumulating at the edges, and facing leaves of colophons (tiba) added over centuries.
---

# Album Leaf with Colophons

## Form
A small square-ish leaf where the painted subject occupies one corner or one third and the rest is deliberate empty ground, a few red collector's seals clustered near an edge in order of arrival, and on the facing leaf columns of later hands commenting on the work, each dated and sealed, so that the object carries its own reception history beside it.

## Spark
You open the album to a single branch of plum in the lower left of an otherwise empty leaf, count five red seals along the right margin from five owners across four hundred years, and turn to the facing page where a Qing connoisseur has written three columns about the brushwork and pressed his own seal beneath.

## System
- Palette/material: silk or paper ground (warm ivory, L 0.93, hue 80, or a darker aged silk at L 0.80), ink in a short tonal range (near-black to pale gray wash), seal vermilion as the only chroma, accumulating in small squares; mounting borders in a darker plain tone (L 0.70) framing each leaf; no other color.
- Type/composition: the subject sits off-center with at least two thirds of the leaf empty; the emptiness is the composition and is never filled; colophons are vertical-rl columns in a brush or Song face on the facing leaf, smaller than the subject, each signed and dated; titles are a short vertical label at the right edge; Latin runs horizontally in a quiet footnote strip below the mount.
- Topology/navigation: the album is a sequence of leaves; a view is a pair (subject leaf, colophon leaf); navigation is turning leaves with the mount as the frame; a collection is the closed album's cover label and a list of leaf titles; depth is the colophon column, which grows as comments arrive.
- Controls/state: the subject is the focus and carries no controls; actions live in the margin as small seal-shaped stamps (hover deepens the red, pressed presses in 1px); a new comment is a new column appended on the facing leaf with its date; selected is a seal ringed in ink; disabled is an unpressed seal outline; errors are an ink correction mark in the margin; loading is the mount with the leaf blank; empty is the mount with a blank leaf and the first seal space open.
- Responsive/motion: on a phone the pair stacks, subject leaf then colophon leaf, the mount borders kept; motion is the leaf turn (a single 300ms horizontal reveal) and the seal press; the subject itself never animates.

## Web leverage
`writing-mode: vertical-rl` for colophons, CSS grid with a fixed large empty region the content is forbidden to enter (`grid-template-areas` naming the void), and `scroll-snap` per leaf pair with the mount as a sticky frame.

## Translation
Nav is the leaf titles and the turn; a list is the colophon column (comments, reviews, changelog entries, each dated and signed); tables do not belong on the leaf (route to a default surface); forms are the margin seals and one plain column to write in; empty state is the blank leaf with an open seal space. Sits on classical (warm ground, serif, generous measure) with the world supplying the forbidden void, the seal-as-action, and the facing-colophon history; organic can carry it for softer brands. Carries portfolios, single-product showcases, reviews and provenance pages, anything where one thing and its history are the content.

## Risks
Costume: an ink-wash background behind a normal grid; seals as decorative badges. Fails for operate surfaces, for anything needing density, and when the void is treated as wasted space and filled; a11y requires the colophons be real text and the seals be labelled buttons. Slop if more than one subject fights for the leaf, if the wash becomes a gradient, or if the seals lose their order of arrival.
