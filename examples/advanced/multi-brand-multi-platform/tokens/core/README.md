# Core tokens

Core tokens can be thought of as both a "base theme" and as "fallbacks" for brands.

When built, there is no "core" brand represented in the built output. However, any missing semantic tokens for a brand will have those tokens included in their output, populated with the core values.

For example, if `nib` had no `color.border.prominent` token defined in its `semantic/color.json` then the `colorBorderProminent` would use the alias token defined in core:

```json
{
  "border": {
    "prominent": {
      "$value": "{color.primitive.neutral.750}"
    }
  }
}
```

If this `color.primitive.neutral.750` token exists within the `nib` primitives, that value will be used. If not, the `core` value will be used.

This _"fallback"_ behaviour makes authoring themes easier as not all tokens need to be supplied, only brand-critical ones.

## Primitive tokens

Primitive tokens are output to their own specific file. They are not uniform in structure and so can not be easily used for white-labelled experiences.

The fallback behaviour described above for semantic and component tokens, is not desirable for primitive color tokens. Primitive colors are the base palette that make up the brand. Foreign colors should not be included.

## Omitting color primitives from output

We wish to omit raw color primitives from the core file from being included in each brand primitives output file, BUT still be able to reference these primitives from the semantic/component layers.

A sneaky way to achieve this is to [not set a value](https://github.com/amzn/style-dictionary/issues/523#issuecomment-769455452) for these "private" tokens. Tokens with no `value` _(or `$value`)_ property set will not be included in the output, but **can** be referenced by alias tokens.

## TLDR

We do not include a `value` property for core primitive tokens to prevent them from being included in the output for each brand.

Like this:

```json
{
  "color": {
    "primitive": {
      "neutral": {
        "0": "#ffffff",
        "25": "#f8f8f8",
        "50": "#f1f1f1"
      }
    }
  }
}
```

Not like this:

```json
{
  "color": {
    "primitive": {
      "neutral": {
        "0": {
          "$value": "#ffffff"
        },
        "25": {
          "$value": "#ffffff"
        },
        "50": {
          "$value": "#ffffff"
        }
      }
    }
  }
}
```
