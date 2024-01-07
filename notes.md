## things we need to validate

1. player autocomplete in search bar
   Autocomplete player name. Show player picture.

2. load player's country flag when user selects player
   I can hit fotmob's endpoint to load up flags. Alternative will be tricky because fotmob has country code and country name. the country code isn't official specifications, so will need to write a converter.

3. compare guessed player to answer
   Iterate through answer player's career history (list of team IDs)
   If guess.teamIDs.contains answer's teamID, then green.
   else black.

for 1 & 2, the data structure in all-prem-players.json is good, no need to simplify further

for 3, need to do somethin

4. edge case: if clues are clubs A, B, C, and player has played at A, B, C, D, then I need to figure out how about display this. Because the player has played at all those clubs but it's still not the right answer. Same with A, B, C <> A, C, B

5. edge case: what if multiple players have the same career path
