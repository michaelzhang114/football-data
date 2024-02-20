## things we need to validate

1. player autocomplete in search bar
   Autocomplete player name. Show player picture.

2. load player's country flag when user selects player
   I can hit fotmob's endpoint to load up flags. Alternative will be tricky because fotmob has country code and country name. the country code isn't official specifications, so will need to write a converter.

3. compare guessed player to answer
   Iterate through answer player's career history (list of team IDs)
   If guess.teamIDs.contains answer's teamID, then green.
   else black.

## features

Possible clues:

-   club names under logos 3
-   dates under logos 4
-   show country flag 5
-   positions
-   player number (x)

Footle #123
❌❌✅⬜⬜
Test your ball knowledge: footlegame.io

🚫🚫🚫🟢⬜
🛑🛑🛑✅⬜

This is problematic: 471271

## CSS stuff I learnt along the way

-   Outline all divs/blocks in the console: https://stackoverflow.com/questions/15086908/how-to-avoid-horizontal-scroll-on-mobile-web-with-responsive-web-design
-   Add `overflow: hidden;` to each element see which one is giving the overflow
