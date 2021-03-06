# Counting Frame

[![Netlify Status](https://api.netlify.com/api/v1/badges/601e171a-fd70-4b31-8f64-def4452bc5cf/deploy-status)](https://app.netlify.com/sites/damonzucconi-counting-frame/deploys)

## Meta

- **State**: production
- **Production**:
  - **URL**: https://counting-frame.work.damonzucconi.com/
  - **URL**: https://damonzucconi-counting-frame.netlify.app/
- **Host**: https://app.netlify.com/sites/damonzucconi-counting-frame/overview
- **Deploys**: Merged PRs to `dzucconi/counting-frame#master` are automatically deployed to production. [Manually trigger a deploy](https://app.netlify.com/sites/damonzucconi-counting-frame/deploys)

## Parameters

| Param                | Description                                | Type     | Default |
| -------------------- | ------------------------------------------ | -------- | ------- |
| `color`              | Color of element                           | `string` | `gray`  |
| `highlightColor`     | Color of element highlight                 | `string` | `white` |
| `backgroundColor`    | Color of background                        | `string` | `black` |
| `latticeColor`       | Color of lattice                           | `string` | `gray`  |
| `powers`             | Powers of ten                              | `number` | `10`    |
| `columnOffsetMs`     | Column offset timing in milliseconds       | `number` | `100`   |
| `columnTransitionMs` | Column transition timing in milliseconds   | `number` | `500`   |
| `logTransitionMs`    | Log row transition timing in milliseconds  | `number` | `250`   |
| `pauseMs`            | Pause between calculations in milliseconds | `number` | `2500`  |
